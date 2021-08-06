import { TSpeechToTextResponse } from '@/types/SpeechRecognitionResults';
import * as fs from 'fs';
import { IamAuthenticator } from 'ibm-watson/auth';
import SpeechToText = require('ibm-watson/speech-to-text/v1');

export const convertSpeechToText = async (file: string): Promise<string> => {
  const params = {
    audio: fs.createReadStream(file),
    contentType: 'application/octet-stream',
    // model: 'ja-JP_BroadbandModel'
    model: 'ja-JP_NarrowbandModel'
  };

  const API_KEY = process.env.API_KEY as string;
  const API_ENDPOINT = process.env.API_ENDPOINT as string;

  const speechToText = new SpeechToText({
    authenticator: new IamAuthenticator({ apikey: API_KEY }),
    serviceUrl: API_ENDPOINT
  });

  const res: TSpeechToTextResponse = await speechToText.recognize(params);
  if (res.status === 200) {
    if (!res.result.results) {
      return '';
    }
    const text = res.result.results?.reduce((acc, cur) => {
      let tmp = '';
      cur.alternatives.map((a) => (tmp += a.transcript));
      return acc + tmp;
    }, '');
    // remove half/full-width white spaces so that text processing is easily done
    return text.replace(/(\s|　)/g, '');
  } else {
    console.log('Filed to convert audio file to text');
    return '';
  }
};
