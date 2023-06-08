# react-native-transmission

React native module for libtransmission.

**Only for Android for now.**

## Installation

```sh
npm install react-native-transmission
```

## Usage

```js
import * as tr from 'react-native-transmission'

tr.init(
  '/data/data/com.transmissionexample/files/configDir',
  'transmission'
);

// Beware to correctly set the download dir when your app load, 
// as default location is not correct by default on android yet.
tr.request(
  {
    method: 'session-set',
    arguments: {
      'download-dir': '/data/data/com.transmissionexample/files/downloads',
    }
  }, (err, res) => {}
)

tr.request(
  {
    method: 'session-get',
    arguments: {
      fields: ['version'],
    },
  },
  (err, res) => {
    if (err) {
      console.error(err)
    }
    console.log(res)
  }
)

tr.close()
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

GPL-v3

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
