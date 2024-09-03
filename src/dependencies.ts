import { confirm } from '@inquirer/prompts';
import { execa } from 'execa';
import { stderr } from 'process';

export const installDependencies = async (packageManager: string) => {
  console.log(`Installing dependencies using ${packageManager}...`);
  console.log();
  try {
    await execa({
      stdout: ['pipe', 'inherit'],
      stderr: ['pipe', 'inherit'],
    })`${packageManager} install`;
  } catch (error) {
    console.error(error);
  }
};

export const upgradeDependencies = async (packageManager: string) => {
  const wantUpgrade = await confirm({ message: 'Do you want to upgrade dependencies?', default: true });

  if (!wantUpgrade) {
    return;
  }

  console.log(`Upgrading dependencies using ${packageManager}...`);
  console.log();
  await execa({
    stdout: ['pipe', 'inherit'],
    stderr: ['pipe', 'inherit'],
  })`${packageManager} upgrade`;

  // remember to commit changes
  console.log('Remember to commit changes');
};
