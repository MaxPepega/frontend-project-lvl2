#!/usr/bin/env node

import { program } from "commander";
import genDiff from "../src/index.js"
import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const getData = (filepath) => {
  const compPath = path.resolve(process.cwd(), filepath); //путь до файла
  const fileUrl = new URL(`file://${compPath}`);
  const file = fs.readFileSync(fileUrl, 'utf-8');
  return file;
}; 

program
  .version('1.0.1')
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1 filepath2>')
  .option('-f, --format <type>','output format')
  .action((smth, env) => {
    const files = env.map((file) => getData(file));
    const [first, second] = files;
    const result = genDiff(first, second);
    process.stdout.write(result);
  });
program.parse(process.argv);