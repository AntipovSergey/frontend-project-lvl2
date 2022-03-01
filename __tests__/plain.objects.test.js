import { test, expect } from '@jest/globals';
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('correctness of comparing flat JSON-files', () => {
  const diff = genDiff('file1.json', 'file2.json');
  const plainFile = readFile('plain.txt');
  expect(diff).toEqual(plainFile);
});
