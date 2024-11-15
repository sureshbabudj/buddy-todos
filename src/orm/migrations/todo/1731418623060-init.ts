import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1731418623060 implements MigrationInterface {
  name = "Init1731418623060";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
           CREATE TABLE IF NOT EXISTS todos (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              title TEXT NOT NULL,
              completed BOOLEAN NOT NULL DEFAULT 0
           )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "todos"`);
  }
}
