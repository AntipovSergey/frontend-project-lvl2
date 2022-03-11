import { test, expect } from '@jest/globals';
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('correctness of comparing nested JSON-files', () => {
  const diff = genDiff('file3.json', 'file4.json');
  const nestedFile = readFile('nested.txt');
  expect(diff).toEqual(nestedFile);
});

test('correctness of comparing nested yaml-files', () => {
  const diff = genDiff('file3.yaml', 'file4.yaml');
  const nestedFile = readFile('nested.txt');
  expect(diff).toEqual(nestedFile);
});

test('correctness of comparing nested JSON-file and yaml-file', () => {
  const diff = genDiff('file3.json', 'file4.yaml');
  const nestedFile = readFile('nested.txt');
  expect(diff).toEqual(nestedFile);
});

test('correctness of comparing nested JSON-files', () => {
  const diff = genDiff('file3.json', 'file4.json');
  const nestedFile = readFile('nested.txt');
  expect(diff).toEqual(nestedFile);
});

// test('correctness of comparing nested yaml-files', () => {
//   const diff = genDiff('file3.yaml', 'file4.json');
//   const nestedFile = readFile('nested.txt');
//   expect(diff).toEqual(nestedFile);
// });

// test('correctness of comparing nested JSON-file and yaml-file in plain format', () => {
//   const diff = genDiff('file3.json', 'file4.yaml');
//   const nestedFile = readFile('plain.txt');
//   expect(diff).toEqual(nestedFile);
// });
