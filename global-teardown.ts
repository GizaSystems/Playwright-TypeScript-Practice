import { execSync } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';

/**
 * Generates the Allure report and then opens the generated HTML file 
 * using synchronous shell commands.
 */
module.exports = async () => {

  // --- Configuration ---
  const GENERATE_CMD = 'npx allure generate allure-results --single-file --clean';
  const REPORT_DIR = path.join(process.cwd(), 'allure-report');
  const REPORT_FILE = path.join(REPORT_DIR, 'index.html');

  // Command to open the report file, tailored by OS
  let OPEN_CMD: string;
  switch (process.platform) {
    case 'darwin': // macOS
      OPEN_CMD = `open ${REPORT_FILE}`;
      break;
    case 'win32': // Windows
      // 'start' command needs the path in quotes
      OPEN_CMD = `start "" "${REPORT_FILE}"`;
      break;
    default: // Linux and others
      OPEN_CMD = `xdg-open ${REPORT_FILE}`;
      break;
  }

  try {
    // 1. Execute Allure generate command (Synchronous)
    console.log(`\n🔄 Generating Allure Report single HTML file...`);
    // The output is buffered, but we'll print it for confirmation
    execSync(GENERATE_CMD, { stdio: 'pipe' });
    // console.log(`Generate command output: \n${generateOutput.toString().trim()}`);
    console.log('✅ Allure report generation complete.');

    // 2. Use 'fs' and 'path' to verify the file was created
    if (!fs.existsSync(REPORT_FILE)) {
      throw new Error(`Report file not found after generation: ${REPORT_FILE}`);
    }

    // 3. Execute command to open the HTML file (Synchronous)
    console.log(`\n🔄 Openning Allure Report...`);
    execSync(OPEN_CMD, { stdio: 'inherit' });
    console.log('🚀 Allure report opened in default browser.');

  } catch (error) {
    console.error('\n❌ An error occurred during command execution.');
    if (error instanceof Error && 'stderr' in error) {
      console.error(`Error details: \n${(error as any).stderr.toString().trim()}`);
    } else {
      console.error(error);
    }
    // Exit the process with an error code
    process.exit(1);
  }
};