import { getAudioModel, TSpeechToTextResponse } from '@/types/SpeechToTextV1';
import * as fs from 'fs';
import { IamAuthenticator } from 'ibm-watson/auth';
import SpeechToText = require('ibm-watson/speech-to-text/v1');

/**
 *
 * @param file path of audio file
 * @returns text extracted from audio data
 */
export const convertSpeechToText = async (
  file: string
): Promise<string | null> => {
  const params = {
    audio: fs.createReadStream(file),
    contentType: 'application/octet-stream',
    model: getAudioModel(file)
  };

  const API_KEY_STT = process.env.API_KEY_STT as string;
  const API_ENDPOINT_STT = process.env.API_ENDPOINT_STT as string;

  const speechToText = new SpeechToText({
    authenticator: new IamAuthenticator({ apikey: API_KEY_STT }),
    serviceUrl: API_ENDPOINT_STT
  });

  try {
    const res: TSpeechToTextResponse = await speechToText.recognize(params);
    if (res.status !== 200) {
      console.log('SpeechToText API call has failed:');
      console.log(res.statusText);
      return null;
    }
    // text is in res > result > results > alternatives > transcript
    // connect all the transcripts to create one text
    // if there is no transcripts at all, text is ragarded as empty
    const text =
      res.result.results?.reduce((acc, cur) => {
        let tmp = '';
        cur.alternatives.map((a) => (tmp += a.transcript));
        return acc + tmp;
      }, '') || '';

    // remove half/full-width white spaces so that text processing is easily done
    return text.replace(/(\s|　)/g, '');
  } catch (e) {
    console.log('An error has occured during SpeechToText API call:');
    console.log(e);
    return null;
  }
};
