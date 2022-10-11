"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Appointments1653153218339 = void 0;
var _typeorm = require("typeorm");
class Appointments1653153218339 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'appointments',
      columns: [{
        name: 'id',
        type: 'int',
        isPrimary: true,
        isNullable: false,
        isGenerated: true,
        generationStrategy: 'increment'
      }, {
        name: 'description',
        type: 'varchar(250)',
        isNullable: true
      }, {
        name: 'comments',
        type: 'varchar(250)',
        isNullable: true
      }, {
        name: 'status',
        type: 'int',
        isNullable: false
      }, {
        name: 'type',
        type: 'int',
        isNullable: false
      }, {
        name: 'date_scheduled',
        type: 'date',
        isNullable: false
      }, {
        name: 'start_hour',
        type: 'time',
        isNullable: false
      }, {
        name: 'duration',
        type: 'time',
        isNullable: false
      }, {
        name: 'end_hour',
        type: 'time',
        isNullable: false
      }, {
        name: 'price',
        type: 'decimal(15,2)',
        isNullable: false
      }, {
        name: 'scheduled',
        type: 'boolean',
        isNullable: false
      }, {
        name: 'user_id',
        type: 'int',
        isNullable: false
      }, {
        name: 'client_id',
        type: 'int',
        isNullable: false
      }, {
        name: 'serviceType_id',
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
        name: 'FkUsrIdAppntmn',
        referencedTableName: 'users',
        // tabela do USERS
        referencedColumnNames: ['user_id'],
        // nome da coluna LA no user
        columnNames: ['user_id'] //nome da coluna AQUI
      }, {
        name: 'FkClientIdAppntmn',
        referencedTableName: 'clients',
        // tabela do USERS
        referencedColumnNames: ['id'],
        // nome da coluna LA no user
        columnNames: ['client_id'] //nome da coluna AQUI
      }, {
        name: 'FkSrvcTypIdAppntmn',
        referencedTableName: 'services_types',
        // tabela do USERS
        referencedColumnNames: ['id'],
        // nome da coluna LA no user
        columnNames: ['serviceType_id'] //nome da coluna AQUI
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('appointments');
  }
}
exports.Appointments1653153218339 = Appointments1653153218339;