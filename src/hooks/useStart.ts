import {
  Quicksand_300Light,
  Quicksand_500Medium,
  Quicksand_700Bold,
  useFonts,
} from '@expo-google-fonts/quicksand';
import {useEffect, useState} from 'react';
import {createHistoryTable, getLastGame} from '../repository/history';

export const useStart = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [dbReady, setDbReady] = useState(false);

  const [fontsLoaded] = useFonts({
    Quicksand_300Light,
    Quicksand_500Medium,
    Quicksand_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded && !dbReady) {
      (async () => {
        try {
          const created = await createHistoryTable();
          if (created) {
            const lastGame = await getLastGame();
            console.log('lastGame', lastGame);
          }
        } catch (error) {
          console.error('Error initializing database:', error);
        } finally {
          setDbReady(true);
        }
      })();
    }
  }, [fontsLoaded, dbReady]);

  useEffect(() => {
    if (fontsLoaded && dbReady) {
      setAppIsReady(true);
    }
  }, [fontsLoaded, dbReady]);

  return {appIsReady};
};
