import fs from 'fs';
import { Answers } from './ask';
import { replacePlaceholders } from './helpers';

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

  // check if directory is empty, if not exit and alert with an error message

  const isDirectoryEmpty = (await fs.promises.readdir(answers.projectName)).length === 0;
  if (!isDirectoryEmpty) {
    throw new Error(`Directory ${answers.projectName} is not empty.`);
  }

  const templateFiles = await fs.promises.readdir('templates');

  console.log('Copying files...');
  console.log();

  const copyAndReplace = async (file: string) => {
    const content = await fs.promises.readFile(`templates/${file}`, 'utf8');
    console.log(`Copying ${file}...`);
    console.log();
    const replacedContent = replacePlaceholders(content, answers);
    await fs.promises.writeFile(`${answers.projectName}/${file}`, replacedContent);
  };

  const copyPromises = templateFiles.map(copyAndReplace);

  await Promise.all(copyPromises);
};
