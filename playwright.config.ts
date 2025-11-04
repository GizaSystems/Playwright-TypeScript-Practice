import { defineConfig, devices } from '@playwright/test';
import * as path from 'path';
import * as os from "node:os";
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  metadata: {
    apiConsoleLogs: false, // Enable APIs console logs
    // apiConsoleLogs: process.env.API_CONSOLE_LOGS === 'true', // for changing the value from the commandline. will work only if added ($env:API_CONSOLE_LOGS="true";) before the execution command
  },
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 3,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'],
    ['html', { open: 'always', outputFolder: 'reports/playwright-report' }],
    ['allure-playwright', {
      outputFolder: 'reports/allure-results',
      environmentInfo: {
        os_platform: os.platform(),
        os_release: os.release(),
        os_version: os.version(),
        node_version: process.version,
      },
      links: {
        tms: {
          nameTemplate: 'Test: #%s',
          urlTemplate: 'https://github.com/orgs/GizaSystems/projects/2?pane=issue&itemId=%s'
        },
        // issue: {
        //   nameTemplate: 'Bug: #%s',
        //   urlTemplate: 'https://allurereport.org/docs/playwright-reference/%s'
        // },
      },
    }],
    ['json', { outputFile: 'reports/json-report/test-results.json' }],
    ['playwright-ctrf-json-reporter', {}]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://automationexercise.com',

    ignoreHTTPSErrors: true,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    headless: true,
    // viewport: { width: 1920, height: 1080 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },

  globalSetup: require.resolve('./global-setup.ts'),
  globalTeardown: require.resolve('./global-teardown.ts'),

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1920, height: 1080 } },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], viewport: { width: 1920, height: 1080 } },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'], viewport: { width: 1920, height: 1080 } },
    },
  ],

});
