import { input, select, Separator } from '@inquirer/prompts';

export interface Answers {
  projectName: string;
  projectDescription: string;
  projectAuthor: string;
  projectVersion: string;
  projectLicense: string;
  projectRepository: string;
  packageManager: string;
}

const Ask = async (): Promise<Answers> => {
  const answers: Answers = {
    projectName: await input({ message: 'What is the project name?', required: true }),
    projectDescription: await input({ message: 'What is your project description (optional)?', default: '' }),
    projectAuthor: await input({ message: 'What is your project author (optional)?', default: '' }),
    projectVersion: await input({ message: 'What is your project version (optional)?', default: '1.0.0' }),
    projectLicense: await input({ message: 'What is your project license (optional)?', default: 'MIT' }),
    projectRepository: await input({ message: 'What is your project repository (optional)?', default: '' }),
    packageManager: await select({
      message: 'What package manager do you want to use (npm or yarn)?',
      choices: [
        {
          name: 'npm',
          value: 'npm',
        },
        {
          name: 'yarn',
          value: 'yarn',
        },
        {
          name: 'pnpm',
          value: 'pnpm',
        },
      ],
      default: 'pnpm',
    }),
  };

  return answers;
};

export { Ask };
