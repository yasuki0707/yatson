import { checkAudioLocale } from '@/modules/CheckAudioLocale';
import { convertSpeechToText } from '@/modules/ConvertSpeechToText';
import { locales, TLocale } from '@/types/Locale';

require('dotenv').config();

const wrapper = async () => {
  const locale = process.argv[2] as TLocale;
  const audioFile = process.argv[3];
  if (!locales.includes(locale)) {
    console.log(`specify locale from {${locales.join(', ')}}`);
    return;
  }
  if (!audioFile) {
    console.log('audio file is not specified.');
    return;
  }
  const text = await convertSpeechToText(audioFile);
  if (!text) {
    console.log("couldn't convert audio data to text.");
    return;
  }

  console.log(
    `is audio file ${locale}?:`,
    await checkAudioLocale(text, locale)
  );
};

wrapper();
