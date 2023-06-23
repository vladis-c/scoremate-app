import {
  Quicksand_300Light,
  Quicksand_500Medium,
  Quicksand_700Bold,
  useFonts,
} from '@expo-google-fonts/quicksand';
import {useEffect, useState} from 'react';

export const useStart = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  const [fontsLoaded] = useFonts({
    Quicksand_300Light,
    Quicksand_500Medium,
    Quicksand_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      setAppIsReady(true);
    }
  }, [fontsLoaded]);

  return {appIsReady};
};
