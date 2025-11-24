import React, {createContext, useContext, useState} from 'react';
import {getRandomColor, shuffleArray} from '../helpers';
import {CustomScore, Player} from '../types';

type ScoreContextType = {
  players: Player[];
  customScore: CustomScore[];
  randomizeColorIsOn: boolean;
  setPlayerScore: (id: Player['id'], increment: number) => void;
  resetPlayersScores: () => void;
  setNewPlayer: (newPlayer: MakeOptional<Player, 'color'>) => void;
  removePlayer: (id: Player['id']) => void;
  setPlayerSettings: (
    key: keyof Player,
    value: Player[keyof Player],
    id: number,
  ) => void;
  shufflePlayerOrder: () => void;
  updateCustomScore: (score: Omit<CustomScore, 'label'>) => void;
  addCustomScore: () => void;
  removeCustomScore: () => void;
  clearCustomScores: () => void;
  toggleRandomizeColorIsSet: () => void;
};

const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

export const ScoreProvider = ({children}: {children: React.ReactNode}) => {
  const [players, setPlayers] = useState<Player[]>([
    {
      id: 1,
      name: '',
      color: getRandomColor([]),
      score: 0,
    },
  ]);
  const [customScore, setCustomScore] = useState<CustomScore[]>([]);
  const [randomizeColorIsOn, setRandomizeColorIsOn] = useState(false);

  const setPlayerScore = (id: Player['id'], increment: number) => {
    setPlayers(prev => {
      const prevPlayers = [...prev];
      const objIndex = prevPlayers.findIndex(p => p.id === id);
      if (objIndex !== -1) {
        const found = prevPlayers[objIndex];
        prevPlayers.splice(objIndex, 1, {
          ...found,
          score: found.score + increment,
        });
      }
      return prevPlayers;
    });
  };

  const resetPlayersScores = () => {
    setPlayers(prev => prev.map(p => ({...p, score: 0})));
  };

  const setNewPlayer = (newPlayer: MakeOptional<Player, 'color'>) => {
    setPlayers(prev => {
      const prevPlayers = [...prev];
      const objIndex = prevPlayers.findIndex(p => p.id === newPlayer.id);
      if (objIndex === -1) {
        const appliedColors = prevPlayers.map(p => p.color);
        const newColor =
          newPlayer?.color ??
          getRandomColor(randomizeColorIsOn ? undefined : appliedColors);
        prevPlayers.push({...newPlayer, color: newColor});
      }
      return prevPlayers;
    });
  };

  const removePlayer = (id: Player['id']) => {
    setPlayers(prev => {
      const prevPlayers = [...prev];
      const objIndex = prevPlayers.findIndex(p => p.id === id);
      if (objIndex !== -1) {
        prevPlayers.splice(objIndex, 1);
      }
      return prevPlayers;
    });
  };

  const setPlayerSettings = (
    key: keyof Player,
    value: Player[keyof Player],
    id: number,
  ) => {
    setPlayers(prev => {
      const prevPlayers = [...prev];
      const foundPlayerIndex = prevPlayers.findIndex(p => p.id === id);
      if (foundPlayerIndex !== -1) {
        const foundPlayer = prevPlayers[foundPlayerIndex];
        const updatedPlayer = {...foundPlayer, [key]: value};
        prevPlayers.splice(foundPlayerIndex, 1, updatedPlayer);
      }
      return prevPlayers;
    });
  };

  const shufflePlayerOrder = () => {
    setPlayers(prev => shuffleArray([...prev]));
  };

  const updateCustomScore = (score: Omit<CustomScore, 'label'>) => {
    const {id, value} = score;
    setCustomScore(prev => {
      const prevScore = [...prev];
      const objectIndex = prevScore.findIndex(s => s.id === id);
      if (objectIndex !== -1) {
        const foundScore = prevScore[objectIndex];
        const updatedScore = {...foundScore, value, label: value};
        prevScore.splice(objectIndex, 1, updatedScore);
      }
      return prevScore;
    });
  };

  const addCustomScore = () => {
    setCustomScore(prev => {
      const prevScore = [...prev];
      prevScore.push({
        label: '',
        value: '0',
        id: prevScore.length + 1,
      });
      return prevScore;
    });
  };

  const removeCustomScore = () => {
    setCustomScore(prev => {
      const prevScore = [...prev];
      prevScore.pop();
      return prevScore;
    });
  };

  const clearCustomScores = () => {
    setCustomScore([]);
  };

  const toggleRandomizeColorIsSet = () => {
    setRandomizeColorIsOn(prev => !prev);
  };

  return (
    <ScoreContext.Provider
      value={{
        players,
        customScore,
        randomizeColorIsOn,
        setPlayerScore,
        resetPlayersScores,
        setNewPlayer,
        removePlayer,
        setPlayerSettings,
        shufflePlayerOrder,
        updateCustomScore,
        addCustomScore,
        removeCustomScore,
        clearCustomScores,
        toggleRandomizeColorIsSet,
      }}>
      {children}
    </ScoreContext.Provider>
  );
};

export const useScore = () => {
  const ctx = useContext(ScoreContext);
  if (!ctx) {
    throw new Error('useScore must be used within a ScoreProvider');
  }
  return ctx;
};

export default ScoreContext;
