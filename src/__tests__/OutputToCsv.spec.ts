import { generateCsvString, SEPARATOR } from '@/modules/Output/OutputToCsv';
import { TSearchedText } from '@/types/SearchedText';

describe('Text processed should be converted to CSV string correctly.', (): void => {
  test('1 data is converted', (): void => {
    const data = [
      {
        keyWord: 'テスト',
        pos: 3,
        redundantKeyWord: 'これはテストです。Th'
      }
    ];
    const expected = `"keyWord","pos","redundantKeyWord"${SEPARATOR}"テスト",3,"これはテストです。Th"`;

    const result = generateCsvString(data);
    expect(result).toStrictEqual(expected);
  });
  test('no data is converted', (): void => {
    const data: TSearchedText[] = [];
    const expected = ``;

    const result = generateCsvString(data);
    expect(result).toStrictEqual(expected);
  });
  test('multiple data is converted', (): void => {
    const data = [
      {
        keyWord: 'テスト',
        pos: 3,
        redundantKeyWord: 'これはテストです。これ'
      },
      {
        keyWord: 'テスト',
        pos: 8,
        redundantKeyWord: 'す。これもテストです。Th'
      },
      {
        keyWord: 'TEST',
        pos: 1000,
        redundantKeyWord: 's is Test!'
      }
    ];
    const expected = `"keyWord","pos","redundantKeyWord"${SEPARATOR}"テスト",3,"これはテストです。これ"${SEPARATOR}"テスト",8,"す。これもテストです。Th"${SEPARATOR}"TEST",1000,"s is Test!"`;

    const result = generateCsvString(data);
    expect(result).toStrictEqual(expected);
  });
});
