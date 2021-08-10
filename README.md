## Purpose of this project
This is a demo application to demonstrate to customers how effective audio recognition Technology is.
The project is yet just fundamental, though it's designed to be added new features as necessary.

---

## Features
- Search specified keyWords in text data which is converted from audio data.
- Output the result in the form of CSV or to Stdout.

---

## Setup environment / Run the application
### Git clone this repository
- via https
```
git clone https://github.com/yasuki0707/yatson.git
```
- via ssh
```
git clone git@github.com:yasuki0707/yatson.git
```

### Install node packages
```
npm install
```

### Setup .env file
- Generate `.env` in the root directory
```
touch .env
```
- Copy & paste the following definitions
```
API_KEY_STT=<API_KEY_STT>
API_ENDPOINT_STT=<API_ENDPOINT_STT>
API_KEY_NLU=<API_KEY_NLU>
API_ENDPOINT_NLU=<API_ENDPOINT_NLU>

# set this value for your preference which is upper limit for the size of audio file
AUDIO_FILE_SIZE_MAX=100
```
<API_KEY_STT> and <API_ENDPOINT_STT>: Credentials to use Speech To Text API
<API_KEY_NLU> and <API_ENDPOINT_NLU>: Credentials to use Natural Language Understanding API
You can get these credentials after creating IBM account and running Watson instance. See [here](https://cloud.ibm.com/registration?target=/developer/watson&cm_sp=WatsonPlatform-WatsonServices-_-OnPageNavLink-IBMWatson_SDKs-_-Node).

### Build the project
```
npm run tsc
```
This should create `./dist/index.js` which entrypoint for the project.

### Run the application
```
node ./dist/index.js <audio_file> <keyword1> <keyword2> <keyword3>...
```
<audio_file>: Relative path to audio file to be searched.  
< keyword> : KeyWords with which text converted from audio data searched 

You can specify multiple keyWords.

---

## Output Format
### CSV
- 1st line is header that includes `keyWord`, `pos` and `redundantKeyWord` followed by actual data.
  - keyWord: 
    - KeyWords with which text converted from audio data searched. This should match keyWords specified in the command when running the application.
    - If keyWords has duplication when specified in the command, **only unique keyWords would appear in the result**.
  - pos:
    - Positions where each keyWord is spotted in converted text data.
    - ordered by ascending.
  - redundantKeyWord:
    - KeyWords that include 5 characters before and after.
    - If there is no 5 characters before, this starts from the beggining of text, on the other hand in case there's no 5 characters after, this ends in the end of text.
    - Corresponding to pos.
- separator: `\r\n`
- delimiter: `,`
- encoding: `utf8` or `Shift_JIS`

### Stdout
- Format is the same with CSV.  
- Just outputted in the console.

---

## TEST
### Unit test
```
npm run test:ut
```
Testcases are in `src/__tests__/**` for more details.

### Intergration test
```
// ok
npm run test:it:ok

// ng - neither audio file nor keyWords are specified
npm run test:it:ng1

// ng - keyWords are not specified
npm run test:it:ng2

// ng - audio file is not specified
npm run test:it:ng3

// ng - non-audio file is specified as if it is
npm run test:it:ng4
```

### Audio file verification test
#### Language  
Check if specified audio file is Japanese/English.  
```
// for Japanese audio
npm run tool:audio:ja <audio_file>

// for English audio
npm run tool:audio:en <audio_file>
```
`true` will be outputted if audio data is Japanese, otherwise `false`.  
*logic*
1. Analyze text converted from audio data and extract some words using [Natural Language Understanding API](https://cloud.ibm.com/docs/services/natural-language-understanding/getting-started.html).
2. **(unimplemented)** Judge from extracted words whether it is likely Japanese audio data. **This part has not yet been implemented**.

#### File size verification  
Check if specified audio file is within designated size.
```
npm run tool:audio:size <audio_file>
```
`true` will be outputted if audio file is within designated size, otherwise `false`.  