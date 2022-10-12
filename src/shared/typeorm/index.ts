import { createConnection } from 'typeorm';
const rootDir = process.env.NODE_ENV === 'development' ? 'src' : 'dist/src';
const extFormat = process.env.NODE_ENV === 'development' ? 'ts' : 'js';

// procura por todas as pastas do arquivo o ormconfig.json
const config: any = {
	type: process.env.DB_TYPE,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	entities: [rootDir + '/modules/**/typeorm/entities/*.' + extFormat],
	migrations: [rootDir + '/shared/typeorm/migrations/*.' + extFormat],
	cli: {
		migrationsDir: rootDir + '/dist/shared/typeorm/migrations',
	},
	ssl: {
		rejectUnauthorized: false,
	},
};

createConnection(config);
