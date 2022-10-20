const rootDir = process.env.NODE_ENV === 'developmentff' ? "src" : "dist";
const extFormat = process.env.NODE_ENV === 'developmentff' ? "ts" : "js";

module.exports = {
	"type": process.env.DB_TYPE,
	"host": process.env.DB_HOST,
	"port": 5432,
	"username": process.env.DB_USERNAME,
	"password": process.env.DB_PASSWORD,
	"database": process.env.DB_DATABASE,
	"entities": ["./src/modules/**/typeorm/entities/*.ts"],
	"migrations": [
		"./src/shared/typeorm/migrations/*.ts"
	],
	"cli": {
		"migrationsDir": "./src/shared/typeorm/migrations"
	},
	"ssl": {
		"rejectUnauthorized": false,
	}
}
