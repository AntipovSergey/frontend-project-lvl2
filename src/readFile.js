import * as fs from 'fs';
import path from 'path';

const getAbsolutePath = (pathFile) => path.resolve(process.cwd(), pathFile);

const readFile = (fileName) => fs.readFileSync(getAbsolutePath(fileName), 'utf8');

export default readFile;
