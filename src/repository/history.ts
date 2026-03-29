import {getDB} from './db';

const createHistoryTable = async () => {
  const db = await getDB();
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS HISTORY (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      gameName TEXT NOT NULL,
      gameDescription TEXT,
      createdAt TEXT NOT NULL,
      amountOfPlayers INTEGER DEFAULT 1
    );
    
    CREATE TABLE IF NOT EXISTS HISTORY_PLAYERS (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      historyId INTEGER NOT NULL,
      playerName TEXT NOT NULL,
      score REAL DEFAULT 0,
      color TEXT NOT NULL,
      FOREIGN KEY (historyId) REFERENCES HISTORY (id) ON DELETE CASCADE
    );
  `);
};

const createGame = async (
  gameName: string,
  gameDescription: string,
  createdAt: string,
  players: {playerName: string; color: string}[],
) => {
  const db = await getDB();
  const result = await db.runAsync(
    'INSERT INTO HISTORY (gameName, gameDescription, createdAt, amountOfPlayers) VALUES (?, ?, ?, ?)',
    [gameName, gameDescription, createdAt, players.length],
  );
  const historyId = result.lastInsertRowId;
  for (const player of players) {
    await db.runAsync(
      'INSERT INTO HISTORY_PLAYERS (historyId, playerName, score, color) VALUES (?, ?, 0, ?)',
      [historyId, player.playerName, player.color],
    );
  }
  return historyId;
};

const addPlayer = async (
  historyId: number,
  playerName: string,
  color: string,
) => {
  const db = await getDB();
  await db.runAsync(
    'INSERT INTO HISTORY_PLAYERS (historyId, playerName, score, color) VALUES (?, ?, 0, ?)',
    [historyId, playerName, color],
  );
  await db.runAsync(
    'UPDATE HISTORY SET amountOfPlayers = amountOfPlayers + 1 WHERE id = ?',
    [historyId],
  );
};

const deletePlayer = async (playerId: number) => {
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
  gameDescription: string,
) => {
  const db = await getDB();
  await db.runAsync(
    'UPDATE HISTORY SET gameName = ?, gameDescription = ? WHERE id = ?',
    [gameName, gameDescription, historyId],
  );
};

const updatePlayer = async (
  playerId: number,
  playerName: string,
  color: string,
) => {
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

export {
  createHistoryTable,
  createGame,
  addPlayer,
  deletePlayer,
  updateGame,
  updatePlayer,
  updateScore,
};
