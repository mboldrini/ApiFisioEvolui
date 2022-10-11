const rootDir = process.env.NODE_ENV === 'development' ? "src" : "dist/src";
const extFormat = process.env.NODE_ENV === 'development' ? "ts" : "js";

module.exports = {
	"port": 3306,
	"type": "mysql",
	"host": process.env.HOST,
 	"username": process.env.USUARIO,
 	"password": process.env.PASSWORD,
 	"database": process.env.DATABASE,
	 "migrations": [rootDir + "/database/migrations/*."+ extFormat],
	 "entities": [rootDir + "/entities/*."+ extFormat],
	 "cli":{
		 "migrationsDir": rootDir + "/database/migrations",
		 "entitiesDir": rootDir + "/entities"
	 },
	 "ssl": {
		 "rejectUnauthorized": false,

	 }
}