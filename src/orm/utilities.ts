import { DataSource } from "typeorm";
import sqliteParams from "./sqliteParams";
import todoDataSource from "./datasources/todoDataSource";

export const initializeDataSources = async () => {
  //check sqlite connections consistency
  await sqliteParams.connection.checkConnectionsConsistency().catch((e: any) => {
    console.log(e);
    return {};
  });

  // Loop through the DataSources
  for (const dataSrc of [todoDataSource]) {
    // initialize
    await dataSrc.dataSource.initialize();
    if (dataSrc.dataSource.isInitialized) {
      // run the migrations
      await dataSrc.dataSource.runMigrations();
    }
    if (sqliteParams.platform === "web") {
      await sqliteParams.connection.saveToStore(dataSrc.dbName);
    }
  }
};

export const getCountOfElements = async (
  connection: DataSource,
  entity: any
): Promise<number> => {
  // Get the repository for your entity
  const repository = connection.getRepository(entity);
  // Use the count() method to query the count of elements in the table
  const count = await repository.count();

  return count;
};
