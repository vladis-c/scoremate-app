import {ConfigContext, ExpoConfig} from 'expo/config';

export default ({config}: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Scoremate',
  slug: 'scoremate',
  version: '1.1.1',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#EFEFEF',
  },
  assetBundlePatterns: ['**/*'],
  updates: {
    fallbackToCacheTimeout: 300000,
    enabled: true,
    url: 'https://u.expo.dev/69a8df95-80e3-4607-b290-ceefe88aa3b7',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
    package: 'com.vladisc.scoremate',
  },
  web: {
    favicon: './assets/favicon.png',
  },
  plugins: [['expo-updates', {username: 'vladis-c'}]],
  extra: {
    eas: {
      projectId: '69a8df95-80e3-4607-b290-ceefe88aa3b7',
    },
  },
});
