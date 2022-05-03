import mysql from "mysql";
import config from "./config";

class Database {
  pool: mysql.Pool;
  constructor() {
    this.pool = mysql.createPool({
      host: config.DB_HOST,
      port: config.DB_PORT,
      user: config.DB_USER,
      password: config.DB_PASSWORD,
      connectionLimit: 10,
    });
    this.useCarnet();
  }
  useCarnet() {
    this.pool.query("use Carnet", function (error, results, fields) {
      if (error) throw error;
      console.log("Connected to Cloud and using Carnet database");
    });
  }

  showTables() {
    this.pool.query("show tables", function (error, results, fields) {
      if (error) throw error;
      console.log(results);
    });
  }
}

export { Database };
