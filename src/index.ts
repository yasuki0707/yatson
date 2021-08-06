import { convertSpeechToText } from '@/modules/ConvertSpeechToText';
import { processText } from '@/modules/ProcessText';

require('dotenv').config();

const wrapper = async () => {
  // audio file
  const audioFile = process.argv[2];
  if (!audioFile) {
    console.log('オーディオファイルが指定されていません。');
    return;
  }
  // keyWord to search within text converted from audio data
  const keyWords = process.argv.slice(3);
  if (!keyWords.length) {
    console.log('検索単語が指定されていません。');
    return;
  }

  const text = await convertSpeechToText(audioFile);

  const processedText = processText(text, keyWords);
};

wrapper();
