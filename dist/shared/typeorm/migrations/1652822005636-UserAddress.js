"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserAddress1652822005636 = void 0;
var _typeorm = require("typeorm");
class UserAddress1652822005636 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'users_address',
      columns: [{
        name: 'id',
        type: 'int',
        isPrimary: true,
        isNullable: false,
        isGenerated: true,
        generationStrategy: 'increment'
      }, {
        name: 'address',
        type: 'varchar(150)',
        isNullable: true
      }, {
        name: 'number',
        type: 'int',
        isNullable: true
      }, {
        name: 'city',
        type: 'varchar(100)',
        isNullable: true
      }, {
        name: 'district',
        type: 'varchar(100)',
        isNullable: true
      }, {
        name: 'state',
        type: 'varchar(3)',
        isNullable: true
      }, {
        name: 'country',
        type: 'varchar(45)',
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
        name: 'FkUSRADD',
        referencedTableName: 'users',
        // tabela do USERS
        referencedColumnNames: ['user_id'],
        // nome da coluna LA no user
        columnNames: ['user_id'] //nome da coluna AQUI
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('users_address');
  }
}
exports.UserAddress1652822005636 = UserAddress1652822005636;