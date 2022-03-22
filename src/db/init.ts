import Database from "./config";

const initDb = {
  async init() {
    const db = await Database();
    const roomTableInitQuery = `
        CREATE TABLE room (
            id TEXT PRIMARYKEY,
            code INT NOT NULL,
            name TEXT NOT NULL,
            password TEXT NOT NULL
        )
    `;

    const questionTableInitQuery = `
        CREATE TABLE question (
            id TEXT PRIMARYKEY,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            roomId TEXT NOT NULL,
            isRead BOOLEAN NOT NULL,
            FOREIGN KEY (roomId) REFERENCES room(id)
        )
    `;

    await db.exec(roomTableInitQuery);
    await db.exec(questionTableInitQuery);

    await db.close();
  },
};

initDb.init();
