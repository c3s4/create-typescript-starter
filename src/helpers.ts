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
