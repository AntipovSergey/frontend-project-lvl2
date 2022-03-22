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
    ['yaml-file', 'file2.yaml'],
    ['yml-file', 'file2.yml'],
    ['JSON-file', 'file2.json'],
  ])('correctness of parsing %s', (format, data) => {
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
    expect(parseDataWithUnexistingExtention).toThrowError(`Unknown parcing format: '${fileExtention}'!`);
  });
});

describe('correctness of creating diff in different formats', () => {
  describe.each([
    ['stylish', 'stylish.txt'],
    ['plain', 'plain.txt'],
    ['json', 'json.txt'],
  ])('diff in %s format', (format, sample) => {
    const expectedValue = readFile(sample);
    test.each([
      ['json', 'json'],
      ['yaml', 'yaml'],
      ['json', 'yaml'],
    ])('compare %s with %s', (format1, format2) => {
      const actualValue = genDiff(
        `__fixtures__/file1.${format1}`,
        `__fixtures__/file2.${format2}`,
        format,
      );
      expect(actualValue).toEqual(expectedValue);
    });
  });
  describe('diff in default format', () => {
    test.each([
      ['json', 'json'],
      ['yaml', 'yaml'],
      ['json', 'yaml'],
    ])('compare %s with %s', (format1, format2) => {
      const actualValue = genDiff(
        `__fixtures__/file1.${format1}`,
        `__fixtures__/file2.${format2}`,
      );
      const expectedValue = readFile('stylish.txt');
      expect(actualValue).toEqual(expectedValue);
    });
  });
  test('unidentified format', () => {
    function parseDataWithUnexistingFormat() {
      genDiff('__fixtures__/file1.json', '__fixtures__/file2.yaml', 'txt');
    }
    expect(parseDataWithUnexistingFormat).toThrowError('Unknown format');
  });
});
