import fs from 'fs';
import child_process from 'child_process';
import path from 'path';

try {
    if (!fs.existsSync('./node_modules')) {
        if (fs.existsSync('./pnpm-lock.yaml')) {
            console.log(
                'pnpm-lock.yaml file found. Using pnpm to install dependencies and build the project.',
            );
            child_process.execSync('pnpm install', { stdio: 'inherit' });
        } else if (fs.existsSync('./yarn.lock')) {
            console.log(
                'yarn.lock file found. Using yarn to install dependencies and build the project.',
            );
            child_process.execSync('yarn install', { stdio: 'inherit' });
        } else {
            console.log(
                'No pnpm-lock.yaml or yarn.lock file found. Using npm to install dependencies and build the project.',
            );
            child_process.execSync('npm install', { stdio: 'inherit' });
        }
    }

    if (!fs.existsSync('./dist')) {
        if (fs.existsSync('./pnpm-lock.yaml')) {
            console.log(
                'pnpm-lock.yaml file found. Using pnpm to install dependencies and build the project.',
            );
            child_process.execSync('pnpm run build', { stdio: 'inherit' });
        } else if (fs.existsSync('./yarn.lock')) {
            console.log(
                'yarn.lock file found. Using yarn to install dependencies and build the project.',
            );
            child_process.execSync('yarn run build', { stdio: 'inherit' });
        } else {
            console.log(
                'No pnpm-lock.yaml or yarn.lock file found. Using npm to install dependencies and build the project.',
            );
            child_process.execSync('npm run build', { stdio: 'inherit' });
        }
    }
} catch (error) {
    console.error(
        'An error occurred while installing dependencies or building the project:',
        error,
    );
    console.log(
        'You may need to navigate to the current directory and perform the install and build step manually.',
    );
    console.log('Current directory:', path.resolve());
}
