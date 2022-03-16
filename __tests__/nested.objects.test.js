import { test, expect, describe } from '@jest/globals';
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import * as yaml from 'js-yaml';
import genDiff from '../index.js';
import parseFile from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('correctness of parsing files', () => {
  test('correctness of parsing yaml-file', () => {
    const dataContent = readFile('file4.yaml');
    const parsedData = parseFile('file4.yaml', dataContent);
    const trueValue = yaml.load(readFile('file4.yaml'));
    expect(parsedData).toEqual(trueValue);
  });
  test('correctness of parsing JSON-file', () => {
    const dataContent = readFile('file4.json');
    const parsedData = parseFile('file4.json', dataContent);
    const trueValue = JSON.parse(readFile('file4.json'));
    expect(parsedData).toEqual(trueValue);
  });
  test('throws on octopus', () => {
    const dataExtention = path.extname('file4.txt');
    function parseDataWithUnexistingExtention() {
      parseFile('file4.txt');
    }
    expect(parseDataWithUnexistingExtention).toThrowError(`Unknown file extention '${dataExtention}'!`);
  });
});

describe('correctness of creating diff in stylish format', () => {
  test('stylish format (only JSON-files)', () => {
    const diff = genDiff('__fixtures__/file3.json', '__fixtures__/file4.json', 'stylish');
    const result = readFile('stylish.txt');
    expect(diff).toEqual(result);
  });
  test('stylish format (only yaml-files)', () => {
    const diff = genDiff('__fixtures__/file3.yaml', '__fixtures__/file4.yaml', 'stylish');
    const result = readFile('stylish.txt');
    expect(diff).toEqual(result);
  });
  test('stylish format (different files)', () => {
    const diff = genDiff('__fixtures__/file3.json', '__fixtures__/file4.yaml', 'stylish');
    const result = readFile('stylish.txt');
    expect(diff).toEqual(result);
  });
});
describe('correctness of creating diff in plain format', () => {
  test('plain format (only JSON-files)', () => {
    const diff = genDiff('__fixtures__/file3.json', '__fixtures__/file4.json', 'plain');
    const result = readFile('plain.txt');
    expect(diff).toEqual(result);
  });
  test('plain format (only yaml-files)', () => {
    const diff = genDiff('__fixtures__/file3.yaml', '__fixtures__/file4.yaml', 'plain');
    const result = readFile('plain.txt');
    expect(diff).toEqual(result);
  });
  test('plain format (different files)', () => {
    const diff = genDiff('__fixtures__/file3.json', '__fixtures__/file4.yaml', 'plain');
    const result = readFile('plain.txt');
    expect(diff).toEqual(result);
  });
});
describe('correctness of creating diff in json format', () => {
  test('JSON format (only JSON-files)', () => {
    const diff = genDiff('__fixtures__/file3.json', '__fixtures__/file4.json', 'json');
    const result = readFile('json.txt');
    expect(diff).toEqual(result);
  });
  test('JSON format (only yaml-files)', () => {
    const diff = genDiff('__fixtures__/file3.yaml', '__fixtures__/file4.yaml', 'json');
    const result = readFile('json.txt');
    expect(diff).toEqual(result);
  });
  test('JSON format (different files)', () => {
    const diff = genDiff('__fixtures__/file3.json', '__fixtures__/file4.yaml', 'json');
    const result = readFile('json.txt');
    expect(diff).toEqual(result);
  });
});
describe('correctness of creating diff in default format', () => {
  test('default format (only JSON-files)', () => {
    const diff = genDiff('__fixtures__/file3.json', '__fixtures__/file4.json');
    const result = readFile('stylish.txt');
    expect(diff).toEqual(result);
  });
  test('default format (only yaml-files)', () => {
    const diff = genDiff('__fixtures__/file3.yaml', '__fixtures__/file4.yaml');
    const result = readFile('stylish.txt');
    expect(diff).toEqual(result);
  });
  test('default format (different files)', () => {
    const diff = genDiff('__fixtures__/file3.json', '__fixtures__/file4.yaml');
    const result = readFile('stylish.txt');
    expect(diff).toEqual(result);
  });
});

test('unidentified format', () => {
  const diff = genDiff('__fixtures__/file3.json', '__fixtures__/file4.yaml', 'txt');
  const result = '';
  expect(diff).toEqual(result);
});
