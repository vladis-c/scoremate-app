import {NavigationContainer} from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import {StatusBar} from 'expo-status-bar';
import {useCallback} from 'react';
import {ClickOutsideProvider} from 'react-native-click-outside';
import 'react-native-gesture-handler';
import {PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {useStart} from './src/hooks/useStart';
import {useUpdate} from './src/hooks/useUpdate';
import MainNavigator from './src/navigation/MainNavigator';
import {store} from './src/store/store';
import {NavigationTheme, PaperTheme, colors} from './src/theme';

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
            <ClickOutsideProvider>
              <MainNavigator />
            </ClickOutsideProvider>
          </NavigationContainer>
        </PaperProvider>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
