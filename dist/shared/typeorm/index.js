"use strict";

var _typeorm = require("typeorm");
// import { createConnection } from 'typeorm';
// // procura por todas as pastas do arquivo o ormconfig.json
// createConnection();

const AppDataSource = new _typeorm.DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'admin',
  password: 'admin',
  database: 'fisioevolui'
});
AppDataSource.initialize().then(() => {
  console.log('Data Source has been initialized!');
}).catch(err => {
  console.error('Error during Data Source initialization', err);
});