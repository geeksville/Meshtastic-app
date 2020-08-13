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