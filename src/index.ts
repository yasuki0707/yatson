import { convertSpeechToText } from '@/modules/ConvertSpeechToText';
import { outputToCsv } from '@/modules/OutputToCsv';
import { outputToStdout } from '@/modules/OutputToStdout';
import { processText } from '@/modules/ProcessText';

require('dotenv').config();

const wrapper = async () => {
  const audioFile = process.argv[2];
  if (!audioFile) {
    console.log('オーディオファイルが指定されていません。');
    return;
  }
  // keyWords to search within text converted from audio data
  const keyWords = process.argv.slice(3);
  if (!keyWords.length) {
    console.log('検索単語が指定されていません。');
    return;
  }

  // convert audio data to text
  const text = await convertSpeechToText(audioFile);
  if (!text) {
    console.log('オーディオファイルをテキストに変換できませんでした。');
    return;
  }

  // process text as you want
  const processedText = processText(text, keyWords);
  if (!processedText.length) {
    console.log('検索単語が検出されませんでした。');
    return;
  }

  // output processed data to external file/stdout
  await outputToCsv(processedText, 'output.csv');
  await outputToStdout(processedText);
};

wrapper();
