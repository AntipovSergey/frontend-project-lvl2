import { test, expect, describe } from '@jest/globals';
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import * as yaml from 'js-yaml';
import genDiff from '../index.js';
import parseFile from '../src/parsers.js';
import getFileExtention from '../src/getFileExtention.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('correctness of parsing files', () => {
  test.each([
    { data: 'file2.yaml', extention: 'yaml-file' },
    { data: 'file2.yml', extention: 'yaml-file' },
    { data: 'file2.json', extention: 'JSON-file' },
  ])('correctness of parsing $extention', ({ data }) => {
    const dataContent = readFile(data);
    const fileExtention = getFileExtention(data);
    const parsedData = parseFile(fileExtention, dataContent);
    const trueValue = yaml.load(readFile(data));
    expect(parsedData).toEqual(trueValue);
  });
  test('unknown extension', () => {
    const fileExtention = getFileExtention('file2.txt');
    function parseDataWithUnexistingExtention() {
      const dataContent = readFile('file2.txt');
      parseFile(fileExtention, dataContent);
    }
    expect(parseDataWithUnexistingExtention).toThrowError(`Unknown file extention '${fileExtention}'!`);
  });
});

describe('correctness of creating diff in stylish format', () => {
  test.each([
    {
      data1: '__fixtures__/file1.json',
      data2: '__fixtures__/file2.json',
      extention: 'only JSON-files',
      sample: 'stylish.txt',
    },
    {
      data1: '__fixtures__/file1.yaml',
      data2: '__fixtures__/file2.yaml',
      extention: 'only yaml-files',
      sample: 'stylish.txt',
    },
    {
      data1: '__fixtures__/file1.json',
      data2: '__fixtures__/file2.yaml',
      extention: 'different files',
      sample: 'stylish.txt',
    },
  ])('stylish format ($extention)', ({ data1, data2, sample }) => {
    const diff = genDiff(data1, data2, 'stylish');
    const result = readFile(sample);
    expect(diff).toEqual(result);
  });
});
describe('correctness of creating diff in plain format', () => {
  test.each([
    {
      data1: '__fixtures__/file1.json',
      data2: '__fixtures__/file2.json',
      extention: 'only JSON-files',
      sample: 'plain.txt',
    },
    {
      data1: '__fixtures__/file1.yaml',
      data2: '__fixtures__/file2.yaml',
      extention: 'only yaml-files',
      sample: 'plain.txt',
    },
    {
      data1: '__fixtures__/file1.json',
      data2: '__fixtures__/file2.yaml',
      extention: 'different files',
      sample: 'plain.txt',
    },
  ])('plain format ($extention)', ({ data1, data2, sample }) => {
    const diff = genDiff(data1, data2, 'plain');
    const result = readFile(sample);
    expect(diff).toEqual(result);
  });
});
describe('correctness of creating diff in json format', () => {
  test.each([
    {
      data1: '__fixtures__/file1.json',
      data2: '__fixtures__/file2.json',
      extention: 'only JSON-files',
      sample: 'json.txt',
    },
    {
      data1: '__fixtures__/file1.yaml',
      data2: '__fixtures__/file2.yaml',
      extention: 'only yaml-files',
      sample: 'json.txt',
    },
    {
      data1: '__fixtures__/file1.json',
      data2: '__fixtures__/file2.yaml',
      extention: 'different files',
      sample: 'json.txt',
    },
  ])('json format ($extention)', ({ data1, data2, sample }) => {
    const diff = genDiff(data1, data2, 'json');
    const result = readFile(sample);
    expect(diff).toEqual(result);
  });
});
describe('correctness of creating diff in default format', () => {
  test.each([
    {
      data1: '__fixtures__/file1.json',
      data2: '__fixtures__/file2.json',
      extention: 'only JSON-files',
      sample: 'stylish.txt',
    },
    {
      data1: '__fixtures__/file1.yaml',
      data2: '__fixtures__/file2.yaml',
      extention: 'only yaml-files',
      sample: 'stylish.txt',
    },
    {
      data1: '__fixtures__/file1.json',
      data2: '__fixtures__/file2.yaml',
      extention: 'different files',
      sample: 'stylish.txt',
    },
  ])('default format ($extention)', ({ data1, data2, sample }) => {
    const diff = genDiff(data1, data2);
    const result = readFile(sample);
    expect(diff).toEqual(result);
  });
});

test('unidentified format', () => {
  function parseDataWithUnexistingFormat() {
    genDiff('__fixtures__/file1.json', '__fixtures__/file2.yaml', 'txt');
  }
  expect(parseDataWithUnexistingFormat).toThrowError('Unknown format');
});
