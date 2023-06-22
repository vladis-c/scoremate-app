import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'expo-status-bar';
import {PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';

import {store} from './src/store/store';
import {NavigationTheme, PaperTheme} from './src/theme';
import MainNavigator from './src/navigation/MainNavigator';
import {useStart} from './src/hooks/useStart';

const App = () => {
  useStart();
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PaperProvider theme={PaperTheme}>
          <NavigationContainer theme={NavigationTheme}>
            <StatusBar translucent={true} />
            <MainNavigator />
          </NavigationContainer>
        </PaperProvider>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
