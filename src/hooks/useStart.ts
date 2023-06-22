import {
  Quicksand_300Light,
  Quicksand_500Medium,
  Quicksand_700Bold,
  useFonts,
} from '@expo-google-fonts/quicksand';
import {store} from '../store/store';
import {useEffect} from 'react';
import {setAppIsReady} from '../store/service';

export const useStart = () => {
  const {dispatch} = store;
  const [fontsLoaded] = useFonts({
    Quicksand_300Light,
    Quicksand_500Medium,
    Quicksand_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      dispatch(setAppIsReady(true));
    }
  }, [fontsLoaded]);
};
