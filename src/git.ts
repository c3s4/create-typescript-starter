import { execa } from 'execa';
import { escape } from 'querystring';

// init git repository
export const initGitRepository = async () => {
  console.log('Initializing git repository...');
  console.log();
  await execa({
    stdout: ['pipe', 'inherit'],
    stderr: ['pipe', 'inherit'],
  })`git init --initial-branch=main`;
};

export const addFilesToGit = async () => {
  console.log('Adding files...');
  await execa({
    stdout: ['pipe', 'inherit'],
    stderr: ['pipe', 'inherit'],
  })`git add .`;
};

export const commitInitialFiles = async () => {
  console.log('Committing initial files...');
  console.log();

  // we use a message variable because the escape with spaces causes an error
  const message = 'Initial commit';
  await execa({
    escape: false,
    stdout: ['pipe', 'inherit'],
    stderr: ['pipe', 'inherit'],
  })`git commit -m ${message}`;
};
