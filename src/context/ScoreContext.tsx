import React, {createContext, useContext, useEffect, useState} from 'react';
import {getRandomColor, shuffleArray} from '../helpers';
import {historyDb} from '../repository/history';
import {CustomScore, Game, Player} from '../types';

type ScoreContextType = {
  currentGame: Game | null;
  createNewGame: () => void;
  updateGame: (name: string) => void;
  players: Player[];
  customScore: CustomScore[];
  setPlayerScore: (id: Player['id'], increment: number) => void;
  resetPlayersScores: () => void;
  setNewPlayer: (newPlayer: MakeOptional<Player, 'color'>) => void;
  removePlayer: (id: Player['id']) => void;
  setPlayerSettings: (player: Omit<Player, 'score'>) => void;
  savePlayerSettings: (player: Player) => void;
  shufflePlayerOrder: () => void;
  updateCustomScore: (score: Omit<CustomScore, 'label'>) => void;
  addCustomScore: () => void;
  removeCustomScore: () => void;
  clearCustomScores: () => void;
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

  const setPlayerScore = async (id: Player['id'], increment: number) => {
    const prevPlayers = [...players];
    const objIndex = prevPlayers.findIndex(p => p.id === id);
    if (objIndex !== -1) {
      const found = prevPlayers[objIndex];

      prevPlayers.splice(objIndex, 1, {
        ...found,
        score: found.score + increment,
      });
      await historyDb.updateScore(id, prevPlayers[objIndex].score);
    }

    setPlayers(prevPlayers);
  };

  const resetPlayersScores = async () => {
    if (!currentGame) {
      return;
    }
    setPlayers(prev => prev.map(p => ({...p, score: 0})));
    await historyDb.resetGameScores({historyId: currentGame.id});
  };

  const setNewPlayer = async (newPlayer: MakeOptional<Player, 'color'>) => {
    const prevPlayers = [...players];
    const objIndex = prevPlayers.findIndex(p => p.id === newPlayer.id);
    if (objIndex === -1) {
      const appliedColors = prevPlayers.map(p => p.color);
      const newColor = newPlayer?.color ?? getRandomColor(appliedColors);

      try {
        if (!currentGame) {
          return;
        }
        const id = await historyDb.addPlayer({
          historyId: currentGame.id,
          color: newColor,
          playerName: newPlayer.name,
        });
        newPlayer.id = id;
      } finally {
        prevPlayers.push({...newPlayer, color: newColor});
        setPlayers(prevPlayers);
      }
    }
  };

  const removePlayer = async (id: Player['id']) => {
    try {
      await historyDb.deletePlayer({playerId: id});
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

  const setPlayerSettings = (player: Omit<Player, 'score'>) => {
    setPlayers(prev => {
      const prevPlayers = [...prev];
      const foundPlayerIndex = prevPlayers.findIndex(p => p.id === player.id);
      if (foundPlayerIndex !== -1) {
        const foundPlayer = prevPlayers[foundPlayerIndex];
        const updatedPlayer = {...foundPlayer, ...player};
        prevPlayers.splice(foundPlayerIndex, 1, updatedPlayer);
      }
      return prevPlayers;
    });
  };

  const savePlayerSettings = async (player: Player) => {
    console.log('player updating', player);
    await historyDb.updatePlayer({
      playerId: player.id,
      playerName: player.name,
      color: player.color,
    });
  };

  const shufflePlayerOrder = () => {
    setPlayers(prev => shuffleArray([...prev]));
  };

  const updateCustomScore = async (score: Omit<CustomScore, 'label'>) => {
    const prevScore = [...customScore];
    const objectIndex = prevScore.findIndex(s => s.id === score.id);
    if (objectIndex !== -1) {
      const updatedScore = {
        id: score.id,
        value: score.value,
        label: score.value.toString(),
      };

      try {
        if (!currentGame) {
          return;
        }
        score.id = await historyDb.addCustomScoring({
          historyId: currentGame?.id,
          value: score.value,
        });
      } finally {
        prevScore.splice(objectIndex, 1, updatedScore);
        setCustomScore(prevScore);
      }
    }
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

  const removeCustomScore = async () => {
    try {
      await historyDb.removeCustomScoring({
        scoringId: customScore[customScore.length - 1].id,
      });
    } finally {
      setCustomScore(prev => {
        const prevScore = [...prev];
        prevScore.pop();
        return prevScore;
      });
    }
  };

  const clearCustomScores = async () => {
    customScore.forEach(async cs => {
      await historyDb.removeCustomScoring({scoringId: cs.id});
    });
    setCustomScore([]);
  };

  const createNewGame = async () => {
    try {
      const createdGame = await historyDb.createGame({
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
    // Todo: SQL and game name
    setCurrentGame(prev => (!prev ? prev : {...prev, name}));
  };

  const fetchLastGame = async () => {
    try {
      const lastGame = await historyDb.getLastGame();
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
        setPlayerScore,
        resetPlayersScores,
        setNewPlayer,
        removePlayer,
        setPlayerSettings,
        savePlayerSettings,
        shufflePlayerOrder,
        updateCustomScore,
        addCustomScore,
        removeCustomScore,
        clearCustomScores,
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
