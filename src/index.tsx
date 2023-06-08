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

export function init(configDir: string, appName: string): void {
  return Transmission.init(configDir, appName);
}

export function request(json: any, callback: any): void {
  return Transmission.request(JSON.stringify(json), (err: any, res: any) =>
    callback(err, JSON.parse(res))
  );
}

export function close(): void {
  return Transmission.close();
}
