import { checkAudioSize } from '@/modules/CheckAudioSize';

require('dotenv').config();
const wrapper = async () => {
  const audioFile = process.argv[2];
  if (!audioFile) {
    console.log('audio file is not specified.');
    return;
  }

  console.log(
    `is audio file's size within threshold?:`,
    await checkAudioSize(audioFile)
  );
};

wrapper();
