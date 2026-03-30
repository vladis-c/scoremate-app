import React, {createContext, useContext, useEffect, useState} from 'react';
import {getRandomColor, shuffleArray} from '../helpers';
import {
  addPlayer,
  createGame,
  deletePlayer,
  getLastGame,
  resetGameScores,
  updateScore,
} from '../repository/history';
import {CustomScore, Game, Player} from '../types';

type ScoreContextType = {
  currentGame: Game | null;
  createNewGame: () => void;
  updateGame: (name: string) => void;
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
  const [currentGame, setCurrentGame] = useState<Game | null>(null);

  const [players, setPlayers] = useState<Player[]>([
    {
      id: 0,
      name: '',
      color: getRandomColor([]),
      score: 0,
    },
  ]);
  const [customScore, setCustomScore] = useState<CustomScore[]>([]);
  const [randomizeColorIsOn, setRandomizeColorIsOn] = useState(false);

  const setPlayerScore = async (id: Player['id'], increment: number) => {
    const prevPlayers = [...players];
    const objIndex = prevPlayers.findIndex(p => p.id === id);
    if (objIndex !== -1) {
      const found = prevPlayers[objIndex];

      prevPlayers.splice(objIndex, 1, {
        ...found,
        score: found.score + increment,
      });
      await updateScore(id, prevPlayers[objIndex].score);
    }

    setPlayers(prevPlayers);
  };

  const resetPlayersScores = async () => {
    if (!currentGame) {
      return;
    }
    setPlayers(prev => prev.map(p => ({...p, score: 0})));
    await resetGameScores(currentGame?.id);
  };

  const setNewPlayer = async (newPlayer: MakeOptional<Player, 'color'>) => {
    const prevPlayers = [...players];
    const objIndex = prevPlayers.findIndex(p => p.id === newPlayer.id);
    if (objIndex === -1) {
      const appliedColors = prevPlayers.map(p => p.color);
      const newColor =
        newPlayer?.color ??
        getRandomColor(randomizeColorIsOn ? undefined : appliedColors);

      try {
        if (!currentGame) {
          return;
        }
        newPlayer.id = await addPlayer({
          historyId: currentGame.id,
          color: newColor,
          playerName: newPlayer.name,
        });
      } finally {
        prevPlayers.push({...newPlayer, color: newColor});
        setPlayers(prevPlayers);
      }
    }
  };

  const removePlayer = async (id: Player['id']) => {
    try {
      await deletePlayer(id);
    } finally {
      setPlayers(prev => {
        const prevPlayers = [...prev];
        const objIndex = prevPlayers.findIndex(p => p.id === id);
        if (objIndex !== -1) {
          prevPlayers.splice(objIndex, 1);
        }
        return prevPlayers;
      });
    }
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
        const updatedScore = {...foundScore, value, label: value.toString()};
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
        value: 0,
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

  const createNewGame = async () => {
    try {
      const createdGame = await createGame({
        gameName: '',
        gameDescription: '',
        createdAt: new Date().toISOString(),
        players: players.map(player => ({
          playerName: player.name,
          color: player.color,
        })),
      });
      setCurrentGame({
        id: createdGame.historyId ?? 0,
        name: '',
        description: '',
      });
      setPlayers(prev =>
        prev.map((p, i) => ({...p, id: createdGame.playerIds[i]})),
      );
    } catch (error) {
      setCurrentGame({id: 0, name: '', description: ''});
    }
  };

  const updateGame = (name: string) => {
    setCurrentGame(prev => (!prev ? prev : {...prev, name}));
  };

  const fetchLastGame = async () => {
    try {
      const lastGame = await getLastGame();
      if (!lastGame) {
        return;
      }
      setCurrentGame({
        id: lastGame.id,
        name: lastGame.gameName,
        description: lastGame.gameDescription,
      });
      setPlayers(
        lastGame.players.map(player => ({
          color: player.color,
          id: player.id,
          name: player.playerName,
          score: player.score,
        })),
      );
      setCustomScore(
        lastGame.customScoring.map(cs => ({
          id: cs.id,
          label:
            cs.value > 0 ? '+' + cs.value : cs.value < 0 ? '-' + cs.value : '0',
          value: cs.value,
        })),
      );
    } catch (error) {
      setCurrentGame({id: 0, name: '', description: ''});
    }
  };

  useEffect(() => {
    fetchLastGame();
  }, []);

  return (
    <ScoreContext.Provider
      value={{
        currentGame,
        createNewGame,
        updateGame,
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
