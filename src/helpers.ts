import fs from 'fs';
import { Answers } from './ask';

export const toValidPackageName = (name: string) => {
  return name
    .trim() // Remove leading/trailing spaces
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9.-]+/g, '-') // Replace invalid characters with hyphen
    .replace(/^[-.]+|[-.]+$/g, '') // Remove leading/trailing hyphens or periods
    .substring(0, 214); // Ensure length is less than 214 characters
};

export const replacePlaceholders = (fileContent: string, vars: Answers) => {
  let file = fileContent;

  Object.entries(vars).forEach(([key, value]) => {
    file = file.replaceAll(`%${key}%`, value || '');
  });

  return file;
};

export const getDataFromJSON = (filePath: string) => {
  const rawData = fs.readFileSync(filePath).toString();
  return JSON.parse(rawData);
};

export const writeJSONtoFile = (filePath: string, data: any) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

const copyItem = async (source: string, file: string, destination: string, vars: Answers) => {
  const currentPath = `${source}/${file}`;
  const stats = await fs.promises.stat(currentPath);
  if (stats.isDirectory()) {
    await fs.promises.mkdir(`${destination}/${file}`);
    await recursiveCopyAndReplace(currentPath, `${destination}/${file}`, vars);
  } else {
    const fileContent = await fs.promises.readFile(currentPath, {
      encoding: 'utf-8',
    });

    const replacedContent = replacePlaceholders(fileContent, vars);
    await fs.promises.writeFile(`${destination}/${file}`, replacedContent);
  }
};

export const recursiveCopyAndReplace = async (source: string, destination: string, vars: Answers) => {
  const files = await fs.promises.readdir(source);
  const copyPromises = files.map((file) => copyItem(source, file, destination, vars));

  return Promise.all(copyPromises);
};
