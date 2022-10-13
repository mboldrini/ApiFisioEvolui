"use strict";

var _typeorm = require("typeorm");
// procura por todas as pastas do arquivo o ormconfig.json

// if (process.env.NODE_ENV === 'development') {
const config = {
  type: process.env.DB_TYPE,
  host: 'ec2-52-70-45-163.compute-1.amazonaws.com',
  port: 5432,
  username: 'fuaqjorgojypcn',
  password: '5f65f88ffa3fecded2d90640edbe28467ead42c19ed161effc52436a2cd268ff',
  database: 'd3ujer3k2ao8v3',
  entities: ['src/modules/**/typeorm/entities/*.ts'],
  migrations: ['src/shared/typeorm/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/dist/shared/typeorm/migrations'
  }
};
(0, _typeorm.createConnection)();