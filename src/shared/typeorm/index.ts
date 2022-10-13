import { createConnection } from 'typeorm';

// procura por todas as pastas do arquivo o ormconfig.json

// if (process.env.NODE_ENV === 'development') {
const config: any = {
	type: process.env.DB_TYPE,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	entities: ['src/modules/**/typeorm/entities/*.ts'],
	migrations: ['src/shared/typeorm/migrations/*.ts'],
	cli: {
		migrationsDir: 'src/dist/shared/typeorm/migrations',
	},
};

createConnection(config);
