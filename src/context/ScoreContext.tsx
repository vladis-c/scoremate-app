import React, {createContext, useContext, useEffect, useState} from 'react';
import {getRandomColor, shuffleArray} from '../helpers';
import {historyDb} from '../repository/history';
import {CustomScore, Game, Player} from '../types';

type ScoreContextType = {
  currentGame: Game | null;
  createNewGame: () => void;
  updateGame: ({
    gameName,
    saveToDb,
  }: {
    gameName: string;
    saveToDb?: boolean | undefined;
  }) => void;
  players: Player[];
  customScore: CustomScore[];
  setPlayerScore: (id: Player['id'], increment: number) => void;
  resetPlayersScores: () => void;
  setNewPlayer: (newPlayer: Omit<MakeOptional<Player, 'color'>, 'id'>) => void;
  removePlayer: (id: Player['id']) => void;
  setPlayerSettings: (player: Omit<Player, 'score'>) => void;
  savePlayerSettings: (player: Player) => void;
  shufflePlayerOrder: () => void;
  updateCustomScore: ({
    score,
    saveToDb,
  }: {
    score: Omit<CustomScore, 'label'>;
    saveToDb?: boolean;
  }) => void;
  addCustomScore: () => void;
  removeCustomScore: () => void;
  clearCustomScores: () => void;
  gamesHistory: Game[];
  hasMoreGames: boolean;
  fetchGamesHistory: ({
    page,
    limit,
  }: {
    page?: number | undefined;
    limit?: number | undefined;
  }) => void;
  fetchGame: (gameId?: number) => void;
  deleteGame: (historyId: number | undefined) => void;
  deleteCurrentGame: () => Promise<boolean>;
  clearStates: () => void;
  resetGamesHistory: () => void;
};

const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

export const ScoreProvider = ({children}: {children: React.ReactNode}) => {
  const [gamesHistory, setGamesHistory] = useState<Game[]>([]);
  const [hasMoreGames, setHasMoreGames] = useState(false);
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

  const setNewPlayer = async (
    newPlayer: Omit<MakeOptional<Player, 'color'>, 'id'>,
  ) => {
    const appliedColors = players.map(p => p.color);
    const newColor = newPlayer?.color ?? getRandomColor(appliedColors);
    let id = players.length + 1;

    try {
      if (!currentGame) {
        return;
      }
      id = await historyDb.addPlayer({
        historyId: currentGame.id,
        color: newColor,
        playerName: newPlayer.name,
      });
    } finally {
      setPlayers(prev => [...prev, {...newPlayer, color: newColor, id}]);
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
    await historyDb.updatePlayer({
      playerId: player.id,
      playerName: player.name,
      color: player.color,
    });
  };

  const shufflePlayerOrder = () => {
    setPlayers(prev => shuffleArray([...prev]));
  };

  const updateCustomScore = async ({
    score,
    saveToDb,
  }: {
    score: Omit<CustomScore, 'label'>;
    saveToDb?: boolean;
  }) => {
    const prevScore = [...customScore];
    const objectIndex = prevScore.findIndex(s => s.id === score.id);
    if (objectIndex !== -1) {
      if (!saveToDb) {
        const updatedScore = {
          id: score.id,
          value: score.value,
          label: score.value.toString(),
        };
        prevScore.splice(objectIndex, 1, updatedScore);
        setCustomScore(prevScore);
        return;
      }
      try {
        if (!currentGame) {
          return;
        }
        await historyDb.updateCustomScoring({
          value: score.value,
          scoreId: score.id,
        });
      } catch (error) {}
    }
  };

  const addCustomScore = async () => {
    const prevScore = [...customScore];
    const newScore = {
      label: '',
      value: 0,
      id: prevScore.length + 1,
    };
    let id = newScore.id;
    try {
      if (!currentGame) {
        return;
      }
      id = await historyDb.addCustomScoring({
        historyId: currentGame.id,
        value: newScore.value,
      });
    } finally {
      prevScore.push({...newScore, id});
      setCustomScore(prevScore);
    }
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
      const playerColor = getRandomColor([]);
      const createdGame = await historyDb.createGame({
        gameName: '',
        gameDescription: '',
        createdAt: new Date().toISOString(),
        players: [
          {
            playerName: '',
            color: playerColor,
          },
        ],
      });
      setCurrentGame({
        id: createdGame.historyId ?? 0,
        name: '',
        description: '',
      });
      setPlayers([
        {color: playerColor, id: createdGame.playerIds[0], name: '', score: 0},
      ]);
      setCustomScore([]);
    } catch (error) {
      setCurrentGame({id: 0, name: '', description: ''});
    }
  };

  const updateGame = async ({
    gameName,
    saveToDb,
  }: {
    gameName: string;
    saveToDb?: boolean;
  }) => {
    if (!currentGame) {
      return;
    }
    if (saveToDb) {
      await historyDb.updateGame({gameName, historyId: currentGame.id});
    }

    const updatedGame = {...currentGame, name: gameName};
    setCurrentGame(updatedGame);
  };

  const fetchGamesHistory = async ({
    page,
    limit,
  }: {
    page?: number;
    limit?: number;
  }) => {
    const {games, hasMore} = await historyDb.getAllGames({page, limit});
    setGamesHistory(prev =>
      page === 1
        ? games.map(game => ({
            id: game.id,
            name: game.gameName,
            createdAt: game.createdAt,
            amountOfPlayers: game.amountOfPlayers,
            hasCustomScoring: game.customScoring,
          }))
        : [
            ...prev,
            ...games.map(game => ({
              id: game.id,
              name: game.gameName,
              createdAt: game.createdAt,
              amountOfPlayers: game.amountOfPlayers,
              hasCustomScoring: game.customScoring,
            })),
          ],
    );
    setHasMoreGames(hasMore);
  };

  const fetchGame = async (gameId?: number) => {
    try {
      let game;
      if (gameId) {
        game = await historyDb.getGameById(gameId);
      } else {
        game = await historyDb.getLastGame();
      }

      if (!game) {
        return;
      }

      setCurrentGame({
        id: game.id,
        name: game.gameName,
        description: game.gameDescription,
      });
      setPlayers(
        game.players.map(player => ({
          color: player.color,
          id: player.id,
          name: player.playerName,
          score: player.score,
        })),
      );
      setCustomScore(
        game.customScoring
          .filter(el => el.value !== 0)
          .map(cs => ({
            id: cs.id,
            label: cs.value > 0 ? '+' + cs.value : cs.value.toString(),
            value: cs.value,
          })),
      );
    } catch (error) {
      setCurrentGame({id: 0, name: '', description: ''});
    }
  };

  const deleteCurrentGame = async () => {
    if (!currentGame) {
      return false;
    }
    return await deleteGame(currentGame.id);
  };

  const deleteGame = async (historyId: number | undefined) => {
    if (!historyId) {
      return false;
    }

    setGamesHistory(prev => {
      const prevGames = [...prev];
      const foundIndex = prevGames.findIndex(el => el.id === historyId);
      if (foundIndex !== -1) {
        prevGames.splice(foundIndex, 1);
      }
      return prevGames;
    });

    try {
      await historyDb.deleteGame({historyId});
    } finally {
      return true;
    }
  };

  const resetGamesHistory = () => {
    setGamesHistory([]);
  };

  const clearStates = () => {
    setGamesHistory([]);
    setHasMoreGames(false);
    setCurrentGame(null);
    setPlayers([]);
    setCustomScore([]);
  };

  useEffect(() => {
    // fetching last game on app launch
    fetchGame();
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
        gamesHistory,
        hasMoreGames,
        fetchGamesHistory,
        fetchGame,
        deleteGame,
        deleteCurrentGame,
        clearStates,
        resetGamesHistory,
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
