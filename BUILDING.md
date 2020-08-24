# Building

Notes on how to build.

## Preparing the build environment

```
git clone https://github.com/grcasanova/Meshtastic-app.git
cd Meshastic-app
npm update
ionic build
npx cap sync
```

## Building for Android

Per https://capacitorjs.com/docs/android

```
npx cap add android
npx cap sync
npx cap open android
```

After changing typescript source files, regenerate the android project with:

```
ionic build
npx cap sync
```

## Bluetooth problem

FIXME - move these notes elsewhere

TODO:

- Set minSdkVersion to 23 so BLE scan can work?
- current BLE lib seems to be a wrapper around https://github.com/don/cordova-plugin-ble-central
- This other lib seems more actively used: https://github.com/randdusing/cordova-plugin-bluetoothle/blob/master/readme.md#initialize

example code here: https://github.com/randdusing/ng-cordova-bluetoothle/blob/master/example/index.js
this lib https://ionicframework.com/docs/native/bluetooth-le
wrapper src: https://github.com/ionic-team/ionic-native/blob/master/src/%40ionic-native/plugins/bluetooth-le/index.ts