import * as path from 'path';

const getFileExtention = (data) => path.extname(data).slice(1);

export default getFileExtention;
