const rootDir = process.env.NODE_ENV === 'development' ? "src" : "dist/src";
const extFormat = process.env.NODE_ENV === 'development' ? "ts" : "js";

module.exports = {
	"type": process.env.DB_TYPE,
	"host": process.env.DB_HOST,
	"port": 5432,
	"username": process.env.DB_USERNAME,
	"password": process.env.DB_PASSWORD,
	"database": process.env.DB_DATABASE,
	"entities": ["./"+ rootDir + +"/modules/**/typeorm/entities/*." + extFormat],
	"migrations": [
		"./"+ rootDir + +"/shared/typeorm/migrations/*." + extFormat
	],
	"cli": {
		"migrationsDir": "./"+ rootDir + +"/shared/typeorm/migrations"
	}
}
