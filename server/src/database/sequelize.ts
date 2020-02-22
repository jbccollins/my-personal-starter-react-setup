import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  database: 'my-database',
  logging: false//(...msg) => console.log(msg), //TODO: add better logging
  // define: {
  //   timestamps: false //TODO: add timestamps
  // }
});