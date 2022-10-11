"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServicesTypes1653136700670 = void 0;
var _typeorm = require("typeorm");
class ServicesTypes1653136700670 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'services_types',
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
        name: 'description',
        type: 'varchar(250)',
        isNullable: true
      }, {
        name: 'duration',
        type: 'time',
        isNullable: false
      }, {
        name: 'price',
        type: 'decimal(15,2)',
        isNullable: false
      }, {
        name: 'paymentMethod_id',
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
        name: 'FkUsrIdMttdUsrstpps',
        referencedTableName: 'users',
        // tabela do USERS
        referencedColumnNames: ['user_id'],
        // nome da coluna LA no user
        columnNames: ['user_id'] //nome da coluna AQUI
      }, {
        name: 'FkPmtdxIdUsrStpps',
        referencedTableName: 'paymentMethod_User',
        // tabela do USERS
        referencedColumnNames: ['id'],
        // nome da coluna LA no user
        columnNames: ['paymentMethod_id'] //nome da coluna AQUI
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('services_types');
  }
}
exports.ServicesTypes1653136700670 = ServicesTypes1653136700670;