import { TLocale } from '@/types/Locale';
import { IamAuthenticator } from 'ibm-watson/auth';
import NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');

// EXTENSION: if specify en_US for the 2nd argument(locale), you can check if audio data is in English
//            (and for the other languages once TLocale is added)
/**
 *
 * @param text text to be checked if it matches locale specified with `locale`
 * @param locale locale which text is checked if it matches.
 * @returns whether text matches locale.
 */
export const checkAudioLocale = async (
  text: string,
  locale: TLocale
): Promise<Boolean> => {
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

  // TODO: judge from detected `words` and `locale` if original text is regarded as locale
  // There being a few WIERD words suggests this is not likely locale, hence the original audio is not locale.
  return true;
};
