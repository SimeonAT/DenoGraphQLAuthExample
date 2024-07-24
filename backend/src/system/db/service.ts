import client from './db.ts';

export default class DatabaseService {
  async sqlReader(filePath: string) {
    const sql = await Deno.readTextFile(filePath)
    const queries = sql.split("\n").filter((query) => query.length > 0);
  
    for (const query of queries) {
      await client.queryArray(query);
    }
  
    return;
  }

  async initDb() {
    const databasePath = `${Deno.cwd()}/src/system/db/sql/database.sql`;
    const schemaPath = `${Deno.cwd()}/src/system/db/sql/schema.sql`;
    const dataPath =  `${Deno.cwd()}/src/system/db/sql/data.sql`;
  
    await this.sqlReader(schemaPath);
    await this.sqlReader(dataPath);
    await this.sqlReader(databasePath);
    return;
  }
}