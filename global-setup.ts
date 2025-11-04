import * as fs from 'fs/promises'; // Use fs/promises for async operations
import * as path from 'path';

const DIR = './allure-results';

module.exports = async () => {
    console.log('🔄 Ensuring Allure results directory exists...');

    try {
        // 1. Ensure the directory exists (recursive: true prevents error if it exists)
        await fs.mkdir(DIR, { recursive: true });
        console.log(`📁 Directory ensured: ${DIR}`);

        // 2. Read the directory contents
        const files = await fs.readdir(DIR);

        if (files.length === 0) {
            console.log('✅ Allure results directory is already clear.');
            return;
        }

        // 3. Clear existing files concurrently using Promise.all
        console.log(`🧹 Clearing ${files.length} existing Allure result files...`);
        const unlinkPromises = files.map(file => {
            const filePath = path.join(DIR, file);
            // Use fs.rm to remove files/directories gracefully, with force for files
            return fs.rm(filePath, { force: true, recursive: true, maxRetries: 3, retryDelay: 100 });
        });

        await Promise.all(unlinkPromises);
        console.log('✅ Allure results cleared.');

    } catch (error) {
        console.error(`❌ Failed to ensure or clear Allure results directory: ${DIR}`, error);
        // Depending on context, you might want to rethrow the error: throw error;
    }
};