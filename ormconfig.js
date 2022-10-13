const rootDir = process.env.NODE_ENV === 'developmentff' ? "src" : "dist";
const extFormat = process.env.NODE_ENV === 'developmentff' ? "ts" : "js";

module.exports = {
	"type": process.env.DB_TYPE,
	"host": process.env.DB_HOST,
	"port": 5432,
	"username": process.env.DB_USERNAME,
	"password": process.env.DB_PASSWORD,
	"database": process.env.DB_DATABASE,
	"entities": ["./dist/modules/**/typeorm/entities/*.js"],
	"migrations": [
		"./dist/shared/typeorm/migrations/*.js"
	],
	"cli": {
		"migrationsDir": "./dist/shared/typeorm/migrations"
	},
	"ssl": {
		"rejectUnauthorized": false,
	}
}
