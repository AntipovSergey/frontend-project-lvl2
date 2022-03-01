import { test, expect } from '@jest/globals';
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('requirenments for comparison flat yaml-files', () => {
  const diff = genDiff('file1.yaml', 'file2.yaml');
  const plainFile = readFile('plain.txt');
  expect(diff).toEqual(plainFile);
});
