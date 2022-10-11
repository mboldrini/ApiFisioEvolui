"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClientEvolution1660682740148 = void 0;
var _typeorm = require("typeorm");
class ClientEvolution1660682740148 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'clients_evolutions',
      columns: [{
        name: 'id',
        type: 'int',
        isPrimary: true,
        isNullable: false,
        isGenerated: true,
        generationStrategy: 'increment'
      }, {
        name: 'about',
        type: 'varchar(1000)',
        isNullable: false
      }, {
        name: 'comments',
        type: 'varchar(500)',
        isNullable: true
      }, {
        name: 'date',
        type: 'date',
        isNullable: false
      }, {
        name: 'client_id',
        type: 'int',
        isNullable: false
      }, {
        name: 'user_id',
        type: 'int',
        isNullable: false
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()'
      }],
      foreignKeys: [{
        name: 'FkUsrIdEvolut',
        referencedTableName: 'users',
        // tabela do USERS
        referencedColumnNames: ['user_id'],
        // nome da coluna LA no user
        columnNames: ['user_id'] //nome da coluna AQUI
      }, {
        name: 'FkPacienteIdEvolui',
        referencedTableName: 'clients',
        // tabela do USERS
        referencedColumnNames: ['id'],
        // nome da coluna LA no user
        columnNames: ['client_id'] //nome da coluna AQUI
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('clients_evolutions');
  }
}
exports.ClientEvolution1660682740148 = ClientEvolution1660682740148;