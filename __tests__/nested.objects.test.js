import { test, expect, describe } from '@jest/globals';
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import * as yaml from 'js-yaml';
import genDiff from '../src/genDiff.js';
import parsers from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('correctness of parsing files', () => {
  test('correctness of parsing yaml-file', () => {
    const parsedData = parsers('file4.yaml');
    const trueValue = yaml.load(readFile('file4.yaml'));
    expect(parsedData).toEqual(trueValue);
  });
  test('correctness of parsing JSON-file', () => {
    const parsedData = parsers('file4.json');
    const trueValue = JSON.parse(readFile('file4.json'));
    expect(parsedData).toEqual(trueValue);
  });
  test('correctness of parsing', () => {
    const parsedData = parsers('file4.txt');
    expect(parsedData).toBe(null);
  });
});

describe('correctness of creating diff in different formats', () => {
  test('stylish format (only JSON-files)', () => {
    const diff = genDiff('file3.json', 'file4.json', 'stylish');
    const result = readFile('nested.txt');
    expect(diff).toEqual(result);
  });
  test('stylish format (only yaml-files)', () => {
    const diff = genDiff('file3.yaml', 'file4.yaml', 'stylish');
    const result = readFile('nested.txt');
    expect(diff).toEqual(result);
  });
  test('stylish format (different files)', () => {
    const diff = genDiff('file3.json', 'file4.yaml', 'stylish');
    const result = readFile('nested.txt');
    expect(diff).toEqual(result);
  });
  test('plain format (only JSON-files)', () => {
    const diff = genDiff('file3.json', 'file4.json', 'plain');
    const result = readFile('plain.txt');
    expect(diff).toEqual(result);
  });
  test('plain format (only yaml-files)', () => {
    const diff = genDiff('file3.yaml', 'file4.yaml', 'plain');
    const result = readFile('plain.txt');
    expect(diff).toEqual(result);
  });
  test('plain format (different files)', () => {
    const diff = genDiff('file3.json', 'file4.yaml', 'plain');
    const result = readFile('plain.txt');
    expect(diff).toEqual(result);
  });
  test('default format (only JSON-files)', () => {
    const diff = genDiff('file3.json', 'file4.json');
    const result = readFile('plain.txt');
    expect(diff).toEqual(result);
  });
  test('default format (only yaml-files)', () => {
    const diff = genDiff('file3.yaml', 'file4.yaml');
    const result = readFile('plain.txt');
    expect(diff).toEqual(result);
  });
  test('default format (different files)', () => {
    const diff = genDiff('file3.json', 'file4.yaml');
    const result = readFile('plain.txt');
    expect(diff).toEqual(result);
  });
  test('default format (different files)', () => {
    const diff = genDiff('file3.json', 'file4.yaml', 'txt');
    const result = '';
    expect(diff).toEqual(result);
  });
});
