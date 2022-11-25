// import mysql, { Connection, QueryOptions } from "mysql";

// const DB_HOST = process.env.DB_HOST;
// const DB_USER = process.env.DB_USER;
// const DB_PASSWORD = process.env.DB_PASSWORD;
// const DB_NAME = process.env.DB_NAME;

// export let con: Connection;

// export const initDatabase = async (): Promise<void> => {
//     con = mysql.createConnection({
//         host: DB_HOST,
//         user: DB_USER,
//         password: DB_PASSWORD,
//         database: DB_NAME,
//     });

//     con.connect((err: any) => {
//         if (err) throw err;
//         console.log("Database connected!! 👏👏");
//     });

// }

// export const getDatabaseConnection = async () : Promise<Connection> => {
//     return con;
// }

// export const query = async (option: string): Promise<any> => {
//     await initDatabase();
//     const result = con.query(option);

//     con.destroy();
//     return result;
// }

import { createPool, Pool } from 'mysql';
import { DATA_SOURCES } from '../../config/vars.config';
const dataSource = DATA_SOURCES.mySqlDataSource;

let pool: Pool;

/**
 * generates pool connection to be used throughout the app
 */
export const initDatabase = () => {
  try {
    pool = createPool({
      connectionLimit: dataSource.DB_CONNECTION_LIMIT,
      host: dataSource.DB_HOST,
      user: dataSource.DB_USER,
      password: dataSource.DB_PASSWORD,
      database: dataSource.DB_DATABASE,
    });

    pool.query('select * from user', [], (err, result) => {
        console.log(err);
        console.log(result);
    });

    console.debug('MySql Adapter Pool generated successfully');
  } catch (error) {
    console.error('[mysql.connector][init][Error]: ', error);
    throw new Error('failed to initialized pool');
  }
}

/**
 * executes SQL queries in MySQL db 
 * 
 * @param {string} query - provide a valid SQL query
 * @param {string[] | Object} params - provide the parameterized values used
 * in the query 
 */
export const execute = <T>(query: string, params: string[] | Object): Promise<T> => {
  try {
    if (!pool) throw new Error('Pool was not created. Ensure pool is created when running the app.');

    return new Promise<T>((resolve, reject) => {
      pool.query(query, params, (error, results) => {
        if (error) reject(error);
        else resolve(results);
      });
    });

  } catch (error) {
    console.error('[mysql.connector][execute][Error]: ', error);
    throw new Error('failed to execute MySQL query');
  }
}