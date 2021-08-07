import { IamAuthenticator } from 'ibm-watson/auth';
import NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');

export const judgeAudioJapanese = async (text: string): Promise<Boolean> => {
  const API_KEY_NLU = process.env.API_KEY_NLU as string;
  const API_ENDPOINT_NLU = process.env.API_ENDPOINT_NLU as string;

  const nlu = new NaturalLanguageUnderstandingV1({
    authenticator: new IamAuthenticator({ apikey: API_KEY_NLU }),
    version: '2018-04-05',
    serviceUrl: API_ENDPOINT_NLU
  });

  const res = await nlu.analyze({
    html: text,
    features: {
      concepts: {},
      keywords: {}
    }
  });

  const words = (res.result.keywords || [])
    ?.map((k) => k.text ?? '')
    .filter(Boolean);

  // TODO: judge from detected `words` if original text is regarded as Japanese
  // There being a few WIERD words suggests this is not likely Japanese, hence the original audio is not Japanese.
  return true;
};
