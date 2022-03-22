import sqlite3 from "sqlite3";
import { open } from "sqlite";

const Database = () =>
  open({
    filename: "./src/db/main.db",
    driver: sqlite3.Database,
  });

export default Database;
