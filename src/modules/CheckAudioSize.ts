import * as fs from 'fs';

export const AUDIO_FILE_SIZE_MAX = 100;

export const checkAudioSize = async (audioFile: string): Promise<Boolean> => {
  const stats = fs.statSync(audioFile);
  const fileSize = stats.size / (1024 * 1024);

  return fileSize < AUDIO_FILE_SIZE_MAX;
};
