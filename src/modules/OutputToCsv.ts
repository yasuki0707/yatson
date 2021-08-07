import * as fs from 'fs';
import { encode } from 'iconv-lite';
import { parse } from 'json2csv';

type TEncoding = 'utf8' | 'Shift_JIS';

const SEPARATOR = '\r\n';
const OUTPUT_PATH = 'output/csv/';

export const outputToCsv = async <T>(
  data: T[],
  csvFile: string,
  encoding?: TEncoding
) => {
  // generate header from data object dynamically
  const fields = Object.keys(data[0]);

  // convert array data to csv string with designated separator
  const csvString = parse(data, { eol: SEPARATOR, fields: fields });

  // encode csv string with designated encoding with default being set to utf8
  const buf = encode(csvString, encoding || 'utf8');

  // output as csv
  fs.writeFile(`${OUTPUT_PATH}${csvFile}`, buf, () => {
    console.log('done');
  });
};
