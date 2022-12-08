import { createPool, Pool} from 'mysql';

let pool: Pool;


export const dbPoolInit = () => {
    try {

        pool = createPool({
            connectionLimit: 20,
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            port: (!process.env.DB_PORT ? 3306 : +process.env.DB_PORT)
        })

    } catch (err) {
        throw new Error('Failed to create database pool.')
    }
}


export const runSQL = <T>(query: string, params: string[] | Object): Promise<T> => {
    try {
      if (!pool) throw new Error('Database pool was not created, check your database details.');
  
      return new Promise<T>((resolve, reject) => {
        pool.query(query, params, (error, results) => {
          if (error) reject('Server error: database issue.');

          else resolve(results);
        });
      });
  
    } catch (error) {
      console.error('[mysql.connector][execute][Error]: ', error);
      throw new Error('failed to execute MySQL query');
    }
  }

export const disconnect = () => {
  pool.end()
}