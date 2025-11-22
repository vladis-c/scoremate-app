# ScoreMate App

ScoreMate: A versatile score tracking and game utility app for board game enthusiasts.
ScoreMate is the ultimate companion for board game enthusiasts and scorekeepers. With its intuitive and versatile features, ScoreMate simplifies score tracking and enhances your gaming experience. Easily keep track of scores for any board game with complex calculations, utilize the built-in randomizer for fair turns, and add excitement with dice randomizers and coin flippers. Say goodbye to manual score calculations and let ScoreMate do the work for you. Whether you need to detect the first player or manage multiple players' scores, ScoreMate has you covered. With its vibrant interface and customizable options, ScoreMate is the essential tool for every board game session. Download ScoreMate now and elevate your board gaming experience!

## Setup

How to run this application on your device

This is a crossplatform React Native Typescript app, suitable for iOS and Android.
NOTE! This app was only tested on Android, however it should be possible to run it on iOS from scratch.

### Installation

- Make sure you have Node v20.\*+ installed.
  - Do not use any version younger, the dependencies won't work (package.json locks it).

- Make sure you have latest Android Studio and Java 17 on your machine.

- You should have expo cli to run this project. Install also EAS services for performing updates and creating custom builds.

```bash
npm i -g expo-cli
```

and

```bash
npm i -g eas-cli
```

- Install dependencies using `yarn`

If you do not have yarn installed:

```bash
npm i -g yarn
```

then for dependencies installation

```bash
yarn
```

### Run on Android

```bash
npx expo run:android --device
```

This action will create local `/android` folder, which is added to git ignore. Then it will give you the choice to run on the attached (via USB) device, or local emulator. Preferably run this app on the real device, some dependencies might work incorrectly on the emulator.

### Run on iOS

NOTE: This app was not tested on iOS. Please, inform the developer if any problems or notes.

```bash
npx expo run:ios
```

This action will create local `/ios` folder, which is added to git ignore. To run it on your device you will need an Apple Developer Subscription. You can use simulator, however some dependencies might work incorrectly there.

### Helpful links

#### List of RN Paper icons

[https://gist.github.com/lydongcanh/4350326c44a7d60738dbf6c07b9b4d35](https://gist.github.com/lydongcanh/4350326c44a7d60738dbf6c07b9b4d35)
