## Purpose of this project
This is a demo application to demonstrate to customers how effective audio recognition Technology is.
The project is yet just fundamental, though it's designed to be added new features as necessary.

---

## Features
- search specified keywords in text data which is converted from audio data
- output the result in the form of CSV or to Stdout

---

## Setup environment / Run the application
### git clone this repository
- via https
```
git clone https://github.com/yasuki0707/yatson.git
```
- via ssh
```
git clone git@github.com:yasuki0707/yatson.git
```

### install node packages
```
npm install
```

### setup .env file
- generate .env in the root directory
```
touch .env
```
- copy & paste the following definitions
```
API_KEY_STT=<API_KEY_STT>
API_ENDPOINT_STT=<API_ENDPOINT_STT>
API_KEY_NLU=<API_KEY_NLU>
API_ENDPOINT_NLU=<API_ENDPOINT_NLU>
```
<API_KEY_STT> and <API_ENDPOINT_STT>: credentials to use Speech To Text API
<API_KEY_NLU> and <API_ENDPOINT_NLU>: credentials to use Natural Language Understanding API
You can get these credentials after creating IBM account and running Watson instance. See [here](https://cloud.ibm.com/registration?target=/developer/watson&cm_sp=WatsonPlatform-WatsonServices-_-OnPageNavLink-IBMWatson_SDKs-_-Node).

### build the project
```
npm run tsc
```
this should create `./dist/index.js` which entrypoint for the project

### run the application
```
node ./dist/index.js <audio_file> <keyword1> <keyword2> <keyword3>...
```
<audio_file>: relative path to audio file to be searched
<keywordx>: keyWords with which text converted from audio data searched 

you can specify multiple keyWords.

---

## Output Format
### CSV
- 1st line is header that includes `keyWord`, `pos` and `redundantKeyWord` followed by actual data.
  - keyWord: 
    - keyWords with which text converted from audio data searched. This should match keyWords specified in the command when running the application.
    - if keyWords has duplication when specified in the command, **only unique keyWords would appear in the result**.
  - pos:
    - positions where each keyWord is spotted in converted text data.
    - ordered by ascending.
  - redundantKeyWord:
    - keyWords that include 5 characters before and after.
    - if there is no 5 characters before, this starts from the beggining of text, on the other hand in case there's no 5 characters after, this ends in the end of text.
    - corresponding to pos.
- separator: `\r\n`
- delimiter: `,`
- encoding: `utf8` or `Shift_JIS`

### Stdout
format is the same with CSV.  
just outputted in the console.

---

## TEST
### Unit test
```
npm run test
```
Testcases are in `src/__tests__/**` for more details.


### Audio file language verification
check if specified audio file is Japanese/English
```
// for Japanese audio
npm run tool:audio:ja <audio_file>

// for English audio
npm run tool:audio:en <audio_file>
```
`true` will be outputted if audio data is Japanese, otherwise `false`.  
**logic**
1. analyze text converted from audio data and extract some words using [Natural Language Understanding API](https://cloud.ibm.com/docs/services/natural-language-understanding/getting-started.html).
2. **[unimplemented]** judge from extracted words whether it is likely Japanese audio data.

### Audio file size verification
check if specified audio file is within designated size
```
npm run tool:audio:size <audio_file>
```
`true` will be outputted if audio file is within designated size, otherwise `false`.  