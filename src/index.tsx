import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-transmission' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const Transmission = NativeModules.Transmission
  ? NativeModules.Transmission
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export default class TransmissionClass {
  constructor(configDir = 'transmission', appName = 'transmission') {
    Transmission.init(configDir, appName);
  }

  close() {
    return Transmission.close();
  }

  request(req: any, cb?: any) {
    // Callback api
    if (cb && typeof cb === 'function') {
      return Transmission.request(JSON.stringify(req), (err: any, res: any) => {
        if (err) return cb(err);
        cb(null, JSON.parse(res));
      });
    }

    // Promise api
    return new Promise((resolve, reject) => {
      Transmission.request(JSON.stringify(req), (err: any, res: any) => {
        if (err) return reject(err);
        resolve(JSON.parse(res));
      });
    });
  }

  saveSettings() {
    return Transmission.saveSettings();
  }
}
