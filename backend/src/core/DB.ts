import { Pool } from "pg";
import config from "../config";

class DB {
  pool: Pool;

  constructor() {
    this.connect();
  }

  public connect() {
    this.pool = new Pool(config.database);
  }

  public async query(params: any) {
    try {
      let response = await this.pool.query(params);

      return response;
    } catch (err) {
      throw err;
    }
  }
}

export default new DB();
