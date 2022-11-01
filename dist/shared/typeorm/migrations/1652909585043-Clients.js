"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Clients1652909585043 = void 0;
var _typeorm = require("typeorm");
class Clients1652909585043 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'clients',
      columns: [{
        name: 'id',
        type: 'int',
        isPrimary: true,
        isNullable: false,
        isGenerated: true,
        generationStrategy: 'increment'
      }, {
        name: 'name',
        type: 'varchar(250)',
        isNullable: false
      }, {
        name: 'dataNascimento',
        type: 'date',
        isNullable: false
      }, {
        name: 'document',
        type: 'varchar(45)',
        isNullable: true
      }, {
        name: 'email',
        type: 'varchar(250)',
        isNullable: true
      }, {
        name: 'celphone',
        type: 'varchar(15)',
        isNullable: true
      }, {
        name: 'second_celphone',
        type: 'varchar(15)',
        isNullable: true
      }, {
        name: 'instagram',
        type: 'varchar(250)',
        isNullable: true
      }, {
        name: 'enabled',
        type: 'boolean',
        isNullable: true
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
        name: 'FkUsrUsrIdClients',
        referencedTableName: 'users',
        // tabela do USERS
        referencedColumnNames: ['user_id'],
        // nome da coluna LA no user
        columnNames: ['user_id'] //nome da coluna AQUI
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('clients');
  }
}
exports.Clients1652909585043 = Clients1652909585043;