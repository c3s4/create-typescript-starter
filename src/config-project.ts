import fs from 'fs';
import { Answers } from './ask';
import { recursiveCopyAndReplace, replacePlaceholders } from './helpers';
import { fileURLToPath } from 'url';
import path from 'path';

// create project folder
export const createProjectFolder = (projectName: string): void => {
  console.log(`Creating project folder ${projectName}...`);
  console.log();

  if (fs.existsSync(projectName)) {
    throw new Error(`Directory ${projectName} already exists.`);
  }

  fs.mkdirSync(projectName);
};

export const copyTemplateFiles = async (answers: Answers): Promise<void> => {
  console.log(`Copying template files to project folder ${answers.projectName}...`);
  console.log();

  const __filename = fileURLToPath(import.meta.url);

  // check if directory is empty, if not exit and alert with an error message
  const isDirectoryEmpty = (await fs.promises.readdir(answers.projectName)).length === 0;
  if (!isDirectoryEmpty) {
    throw new Error(`Directory ${answers.projectName} is not empty.`);
  }
  const templatesPath = path.join(path.dirname(__filename), '..', 'templates');

  console.log('Copying files...');
  console.log();

  await recursiveCopyAndReplace(templatesPath, answers.projectName, answers);
};
