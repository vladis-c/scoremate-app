import {getDB} from './db';

const createHistoryTable = async () => {
  const db = await getDB();
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS HISTORY (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      gameName TEXT,
      createdAt TEXT NOT NULL,
      amountOfPlayers INTEGER DEFAULT 1
    );
    
    CREATE TABLE IF NOT EXISTS HISTORY_PLAYERS (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      historyId INTEGER NOT NULL,
      playerName TEXT,
      score REAL DEFAULT 0,
      color TEXT NOT NULL,
      FOREIGN KEY (historyId) REFERENCES HISTORY (id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS HISTORY_CUSTOM_SCORING (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      historyId INTEGER NOT NULL,
      value INTEGER NOT NULL DEFAULT 1,
      FOREIGN KEY (historyId) REFERENCES HISTORY (id) ON DELETE CASCADE
    );
  `);
};

const createGame = async ({
  gameName,
  createdAt,
  players,
}: {
  gameName: string;
  gameDescription: string;
  createdAt: string;
  players: {playerName: string; color: string}[];
}) => {
  const db = await getDB();
  const result = await db.runAsync(
    'INSERT INTO HISTORY (gameName, createdAt, amountOfPlayers) VALUES (?, ?, ?)',
    [gameName, createdAt, players.length],
  );
  const historyId = result.lastInsertRowId;

  const playerIds: number[] = [];
  for (const player of players) {
    const playerResult = await db.runAsync(
      'INSERT INTO HISTORY_PLAYERS (historyId, playerName, score, color) VALUES (?, ?, 0, ?)',
      [historyId, player.playerName, player.color],
    );
    playerIds.push(playerResult.lastInsertRowId);
  }

  return {
    historyId,
    playerIds,
  };
};

const addPlayer = async ({
  historyId,
  playerName,
  color,
}: {
  historyId: number;
  playerName: string;
  color: string;
}) => {
  const db = await getDB();
  const playerResult = await db.runAsync(
    'INSERT INTO HISTORY_PLAYERS (historyId, playerName, score, color) VALUES (?, ?, 0, ?)',
    [historyId, playerName, color],
  );
  await db.runAsync(
    'UPDATE HISTORY SET amountOfPlayers = amountOfPlayers + 1 WHERE id = ?',
    [historyId],
  );

  return playerResult.lastInsertRowId;
};

const deletePlayer = async ({playerId}: {playerId: number}) => {
  const db = await getDB();
  const result = await db.getFirstAsync<{historyId: number}>(
    'SELECT historyId FROM HISTORY_PLAYERS WHERE id = ?',
    [playerId],
  );
  if (!result) {
    throw new Error('Player not found');
  }
  const historyId = result.historyId;
  await db.runAsync('DELETE FROM HISTORY_PLAYERS WHERE id = ?', [playerId]);
  await db.runAsync(
    'UPDATE HISTORY SET amountOfPlayers = amountOfPlayers - 1 WHERE id = ?',
    [historyId],
  );
};

const updateGame = async (
  historyId: number,
  gameName: string,
  gameDescription?: string,
) => {
  const db = await getDB();
  await db.runAsync(
    'UPDATE HISTORY SET gameName = ?, gameDescription = ? WHERE id = ?',
    [gameName, gameDescription ?? null, historyId],
  );
};

const updatePlayer = async ({
  playerName,
  color,
  playerId,
}: {
  playerId: number;
  playerName: string;
  color: string;
}) => {
  const db = await getDB();
  await db.runAsync(
    'UPDATE HISTORY_PLAYERS SET playerName = ?, color = ? WHERE id = ?',
    [playerName, color, playerId],
  );
};

const updateScore = async (playerId: number, score: number) => {
  const db = await getDB();
  await db.runAsync('UPDATE HISTORY_PLAYERS SET score = ? WHERE id = ?', [
    score,
    playerId,
  ]);
};

const resetGameScores = async ({historyId}: {historyId: number}) => {
  const db = await getDB();
  await db.runAsync(
    'UPDATE HISTORY_PLAYERS SET score = 0 WHERE historyId = ?',
    [historyId],
  );
};

const addCustomScoring = async ({
  historyId,
  value,
}: {
  historyId: number;
  value: number;
}) => {
  const db = await getDB();
  const result = await db.runAsync(
    'INSERT INTO HISTORY_CUSTOM_SCORING (historyId, value) VALUES (?, ?)',
    [historyId, value],
  );
  return result.lastInsertRowId;
};

const removeCustomScoring = async ({scoringId}: {scoringId: number}) => {
  const db = await getDB();
  const row = await db.getFirstAsync<{value: number}>(
    'SELECT value FROM HISTORY_CUSTOM_SCORING WHERE id = ?',
    [scoringId],
  );
  if (!row) {
    throw new Error('Custom scoring entry not found');
  }
  if (row.value === 1) {
    throw new Error('Cannot remove default +1 custom scoring');
  }
  await db.runAsync('DELETE FROM HISTORY_CUSTOM_SCORING WHERE id = ?', [
    scoringId,
  ]);
};

const getAllGames = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  const db = await getDB();

  const rows = await db.getAllAsync<{
    id: number;
    gameName: string;
    createdAt: string;
    amountOfPlayers: number;
    playerNames: string | null;
    hasCustomScoring: number;
  }>(
    `SELECT
       H.id,
       H.gameName,
       H.createdAt,
       H.amountOfPlayers,
       GROUP_CONCAT(HP.playerName, ',') AS playerNames,
       CASE WHEN EXISTS(
         SELECT 1 FROM HISTORY_CUSTOM_SCORING C
         WHERE C.historyId = H.id AND C.value != 1
       ) THEN 1 ELSE 0 END AS hasCustomScoring
     FROM HISTORY H
     LEFT JOIN HISTORY_PLAYERS HP ON HP.historyId = H.id
     GROUP BY H.id
     ORDER BY H.createdAt DESC
     LIMIT ? OFFSET ?`,
    [limit, offset],
  );

  return rows.map(row => ({
    id: row.id,
    gameName: row.gameName,
    createdAt: row.createdAt,
    amountOfPlayers: row.amountOfPlayers,
    playerNames: row.playerNames ? row.playerNames.split(',') : [],
    customScoring: row.hasCustomScoring === 1,
  }));
};

const getGameById = async (historyId: number) => {
  const db = await getDB();

  const history = await db.getFirstAsync<{
    id: number;
    gameName: string;
    gameDescription?: string;
    createdAt: string;
    amountOfPlayers: number;
  }>('SELECT * FROM HISTORY WHERE id = ?', [historyId]);

  if (!history) {
    return null;
  }

  const players = await db.getAllAsync<{
    id: number;
    playerName: string;
    score: number;
    color: string;
  }>('SELECT * FROM HISTORY_PLAYERS WHERE historyId = ?', [historyId]);

  const customScoring = await db.getAllAsync<{
    id: number;
    value: number;
  }>('SELECT * FROM HISTORY_CUSTOM_SCORING WHERE historyId = ?', [historyId]);

  return {
    ...history,
    players,
    customScoring,
  };
};

const getLastGame = async () => {
  const db = await getDB();

  const lastGame = await db.getFirstAsync<{id: number}>(
    'SELECT id FROM HISTORY ORDER BY datetime(createdAt) DESC LIMIT 1',
  );

  if (!lastGame) {
    return null;
  }

  return getGameById(lastGame.id);
};

export const historyDb = {
  createHistoryTable,
  createGame,
  addPlayer,
  deletePlayer,
  updateGame,
  updatePlayer,
  updateScore,
  resetGameScores,
  addCustomScoring,
  removeCustomScoring,
  getAllGames,
  getGameById,
  getLastGame,
};
