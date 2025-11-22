import * as Updates from 'expo-updates';
import {useEffect, useState} from 'react';
import {Alert} from 'react-native';

/**
 * Custom React Hook. Checks for Expo updates. OTA updates
 * Either pass "appIsReady?: boolean", or invoke a function "checkForAvailableUpdates()".
 * Vladislav Cherkasheninov 13.10.2022
 */
export const useUpdate = (appIsReady?: boolean, manualCall?: boolean) => {
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const checkForAvailableUpdates = async () => {
    if (__DEV__) {
      return;
    }
    setLoadingUpdate(true);
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        Alert.alert(
          'A new version of the app is available.',
          'New update is loading.',
          [
            {
              text: 'Ok',
              onPress: fetchUpdates,
            },
          ],
          {cancelable: false},
        );
      }
      if (!update.isAvailable && manualCall) {
        Alert.alert(
          'The app is up-to-date.',
          'You already have the latest version of the app.',
          [
            {
              text: 'Ok',
              onPress: () => setLoadingUpdate(false),
            },
          ],
          {cancelable: false},
        );
      }
      if (!update.isAvailable) {
        setLoadingUpdate(false);
      }
    } catch (error) {
      setLoadingUpdate(false);
      console.log('checkForAvailableUpdates [useCheckForUpdates]', error);
    }
  };

  const fetchUpdates = async () => {
    try {
      const result = await Updates.fetchUpdateAsync();
      if (result) {
        Alert.alert(
          'App has been successfully updated.',
          'App has been updated to the newest version. App will restart.',
          [
            {
              text: 'Ok',
              onPress: async () => await Updates.reloadAsync(),
            },
          ],
          {cancelable: false},
        );
      }
    } catch (error) {
      console.log('fetchUpdates [useCheckForUpdates]', error);
    } finally {
      setLoadingUpdate(false);
    }
  };

  useEffect(() => {
    if (appIsReady) {
      checkForAvailableUpdates();
    }
  }, [appIsReady]);

  return {checkForAvailableUpdates, loadingUpdate};
};
