import { DataSource } from "typeorm";
import sqliteParams from "../sqliteParams";
import { Todo } from "../entities/todo";
import * as migrations from "../migrations/todo";

export const DB_NAME = "todos";

export const dataSourceTodo = new DataSource({
  name: "todoConnection",
  type: "capacitor",
  driver: sqliteParams.connection,
  mode: "no-encryption",
  database: DB_NAME,
  version: 1,
  entities: [Todo],
  logging: ["query", "error", "schema"],
  migrations: migrations,
  subscribers: [],
  synchronize: false, // !!!You will lose all data in database if set to `true`
  migrationsRun: false,
});

const todoDataSource = {
  dataSource: dataSourceTodo,
  dbName: DB_NAME,
};

export default todoDataSource;
