#!/usr/bin/env node

/*

- Steps to be executed
  1. Ask for project name
  2. Ask for project description (optional)
  3. Ask for project author (optional)
  4. Ask for project version (optional)
  5. Ask for project license (optional)
  6. Ask for project repository (optional)
  (7. Ask if is a library or an application, maybe not now)
  7. Ask for package manager (npm or yarn)
  8. Create project folder if not exists
  9. Read template files and replace placeholders
  10. Write files to project folder
  11. Install dependencies adding 
  12. Init git repository
  13. Make initial commit
  14. Ask for dependencies upgrade
  15. Upgrade dependencies if requested
  15. Done

*/

import { Ask } from './ask';
import { copyTemplateFiles } from './config-project';

const start = async () => {
  const answers = await Ask();

  copyTemplateFiles(answers);

  // configure project

  // install dependencies

  // init git repository

  // commit initial files

  // ask for upgrade dependencies

  // upgrade dependencies if requested

  // remember to commit changes

  console.log(answers);
};

start();
