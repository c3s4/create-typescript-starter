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
