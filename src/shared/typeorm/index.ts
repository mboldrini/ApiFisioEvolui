import { createConnection } from 'typeorm';

const rootDir = process.env.NODE_ENV === 'development' ? 'src' : 'dist/src';
const extFormat = process.env.NODE_ENV === 'development' ? 'ts' : 'js';

const config: any = {
	type: process.env.DB_TYPE,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	migrations: [rootDir + '/database/migrations/*.' + extFormat],
	entities: [rootDir + '/entities/*.' + extFormat],
	cli: {
		migrationsDir: rootDir + '/database/migrations',
	},
};

// procura por todas as pastas do arquivo o ormconfig.json
createConnection(config);

// "type": "mysql",
// "host": "localhost",
// "port": 3306,
// "username": "admin",
// "password": "admin",
// "database": "fisioevolui",
