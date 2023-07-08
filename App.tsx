import 'react-native-gesture-handler';
import {useCallback} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'expo-status-bar';
import {PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';
import {ClickOutsideProvider} from 'react-native-click-outside';
import {DraxProvider} from 'react-native-drax';

import {store} from './src/store/store';
import {NavigationTheme, PaperTheme, colors} from './src/theme';
import {useStart} from './src/hooks/useStart';
import {useUpdate} from './src/hooks/useUpdate';
import MainNavigator from './src/navigation/MainNavigator';

SplashScreen.preventAutoHideAsync();

const App = () => {
  const {appIsReady} = useStart();
  useUpdate(appIsReady);

  const hideSplashScreen = useCallback(async () => {
    try {
      if (appIsReady) {
        await SplashScreen.hideAsync();
      }
    } catch (error) {
      console.log('Error when hiding splash,', error);
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  return (
    <SafeAreaProvider onLayout={hideSplashScreen}>
      <StatusBar backgroundColor={colors.LightBlue} animated={true} />
      <Provider store={store}>
        <PaperProvider theme={PaperTheme}>
          <NavigationContainer theme={NavigationTheme}>
            <DraxProvider>
              <ClickOutsideProvider>
                <MainNavigator />
              </ClickOutsideProvider>
            </DraxProvider>
          </NavigationContainer>
        </PaperProvider>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
