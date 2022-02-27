# ⚽ Player Archive ⚽

Search soccer players' archive by name!

[![Netlify Status](https://api.netlify.com/api/v1/badges/1e434f68-0a4c-4b85-8775-7965278a3359/deploy-status)](https://app.netlify.com/sites/playerarchive/deploys)

<br>

### High-level schema
<img src="https://raw.githubusercontent.com/soroushchehresa/player-archive/master/architecture.png" width="100%" />

### Demo
[**https://playerarchive.netlify.app**](https://playerarchive.netlify.app)

<br>

### Features
- Search by speech (Using [React Speech Recognition](https://github.com/JamesBrill/react-speech-recognition) and powered by [Speechly](https://speechly.com))
- Request cancellation (Using [Axios cancel token](https://axios-http.com/docs/cancellation))
- Search without stress the API (500ms delay)

<br>

### Used Libraries
- [React](https://github.com/facebook/react)
- [TypeScript](https://github.com/microsoft/TypeScript)
- [Easy Peasy](https://github.com/ctrlplusb/easy-peasy)
- [Ant Design](https://github.com/ant-design/ant-design)
- [React Speech Recognition](https://github.com/JamesBrill/react-speech-recognition)
- [Lodash](https://github.com/lodash/lodash)
- [Axios](https://github.com/axios/axios)
- [Jest](https://github.com/facebook/jest)
- [Enzyme](https://github.com/enzymejs/enzyme)
- [Normalize.css](https://github.com/necolas/normalize.css)
- [Create React App](https://github.com/facebook/create-react-app)

<br>

### Development

##### First, install dependencies:
```
$ yarn
```

##### Second, add environment variables:
Create `.env` file in the root directory and add `SPEECHLY_ID` with your [Speechly](https://speechly.com) app ID.

##### Then, start development or build production:
```
$ yarn start

// or

$ yarn build
```

### Test

```
$ yarn test
```
