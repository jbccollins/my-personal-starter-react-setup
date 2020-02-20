import { Client } from 'pg';
import { Sequelize } from 'sequelize-typescript';

const DEV_CONNECTION_OPTIONS = {
  database: 'my-database',
};

const PRODUCTION_CONNECTION_OPTIONS = {
  // You can find this by running `heroku pg:credentials:url DATABASE` and checking the "Connection URL:" output 
  connectionString: "postgres://a-long-string-of-characters.compute-n.amazonaws.com:PORT/more-characters",
}

const OPTIONS = process.env.NODE_ENV === "production" ? PRODUCTION_CONNECTION_OPTIONS : DEV_CONNECTION_OPTIONS;

// export const sequelize = new Sequelize({
//   dialect: 'postgres',
//   database: 'my-database',
//   storage: ':memory:',
//   models: [__dirname + '/models']
// });

const executeQuery = async (sql: string, params=[], options=OPTIONS) => {
  try {
    const client = new Client(options)
    await client.connect()
    const res = await client.query(sql, params)
    await client.end()
    return ({success: true, rows: res.rows});
  } catch (e) {
    console.log(">>>>>>>>ERROR<<<<<<<<<")
    console.log(e);
    // console.log(">>>>>>>>>SQL<<<<<<<<<<")
    // console.log(sql);
    return ({
      //error: e
      error: true
    });
  }
};

export {
  executeQuery,
};