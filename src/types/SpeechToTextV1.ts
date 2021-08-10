import SpeechToTextV1 = require('ibm-watson/speech-to-text/v1-generated');

export type TSpeechToTextResponse = SpeechToTextV1.Response<SpeechToTextV1.SpeechRecognitionResults>;

const AudioModel = SpeechToTextV1.RecognizeConstants.Model;

// get audio model depending on fileName
// when fileName includes "narrow" return narrowband model, otherwise broadband model
// TODO: this should be modified so that models for the other languages can be determined as well
//       also depending on fileName is unstable
/**
 *
 * @param fileName path of audio file
 * @returns model of audio file
 */
export const getAudioModel = (fileName: string) =>
  fileName.includes('Narrow')
    ? AudioModel.JA_JP_NARROWBANDMODEL
    : AudioModel.JA_JP_BROADBANDMODEL;
