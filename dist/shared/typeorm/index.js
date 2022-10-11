"use strict";

var _typeorm = require("typeorm");
const config = {
  type: 'mysql',
  port: process.env.DB_PORTA,
  w: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [process.env.ENTITIES],
  migrations: [process.env.MIGRATIONS],
  cli: {
    migrationsDir: process.env.MIGRATIONSDIR
  }
};

// procura por todas as pastas do arquivo o ormconfig.json
(0, _typeorm.createConnection)(config);

// "type": "mysql",
// "host": "localhost",
// "port": 3306,
// "username": "admin",
// "password": "admin",
// "database": "fisioevolui",