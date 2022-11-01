"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserConfigs1653233531527 = void 0;
var _typeorm = require("typeorm");
class UserConfigs1653233531527 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'users_configs',
      columns: [{
        name: 'id',
        type: 'int',
        isPrimary: true,
        isNullable: false,
        isGenerated: true,
        generationStrategy: 'increment'
      }, {
        name: 'user_id',
        type: 'int',
        isNullable: false
      }, {
        name: 'allow_retroactiveDate',
        type: 'boolean',
        isNullable: false
      }, {
        name: 'allow_notifications',
        type: 'boolean',
        isNullable: false
      }, {
        name: 'schedule_startDay',
        type: 'boolean',
        isNullable: false
      }, {
        name: 'user_premium',
        type: 'boolean',
        isNullable: false
      }, {
        name: 'premium_type',
        type: 'int',
        isNullable: true
      }, {
        name: 'premium_until',
        type: 'date',
        isNullable: true
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
        name: 'FkUsrIdUsrCfgs',
        referencedTableName: 'users',
        // tabela do USERS
        referencedColumnNames: ['user_id'],
        // nome da coluna LA no user
        columnNames: ['user_id'] //nome da coluna AQUI
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('users_configs');
  }
}
exports.UserConfigs1653233531527 = UserConfigs1653233531527;