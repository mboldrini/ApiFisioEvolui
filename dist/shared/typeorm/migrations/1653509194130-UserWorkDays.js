"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserWorkDays1653509194130 = void 0;
var _typeorm = require("typeorm");
class UserWorkDays1653509194130 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'user_workDays',
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
        name: 'sunday',
        type: 'boolean',
        isNullable: false
      }, {
        name: 'sunday_startHour',
        type: 'time',
        isNullable: false
      }, {
        name: 'sunday_endHour',
        type: 'time',
        isNullable: false
      }, {
        name: 'monday',
        type: 'boolean',
        isNullable: false
      }, {
        name: 'monday_startHour',
        type: 'time',
        isNullable: false
      }, {
        name: 'monday_endHour',
        type: 'time',
        isNullable: false
      }, {
        name: 'tuesday',
        type: 'boolean',
        isNullable: false
      }, {
        name: 'tuesday_startHour',
        type: 'time',
        isNullable: false
      }, {
        name: 'tuesday_endHour',
        type: 'time',
        isNullable: false
      }, {
        name: 'wednesday',
        type: 'boolean',
        isNullable: false
      }, {
        name: 'wednesday_startHour',
        type: 'time',
        isNullable: false
      }, {
        name: 'wednesday_endHour',
        type: 'time',
        isNullable: false
      }, {
        name: 'thursday',
        type: 'boolean',
        isNullable: false
      }, {
        name: 'thursday_startHour',
        type: 'time',
        isNullable: false
      }, {
        name: 'thursday_endHour',
        type: 'time',
        isNullable: false
      }, {
        name: 'friday',
        type: 'boolean',
        isNullable: false
      }, {
        name: 'friday_startHour',
        type: 'time',
        isNullable: false
      }, {
        name: 'friday_endHour',
        type: 'time',
        isNullable: false
      }, {
        name: 'saturday',
        type: 'boolean',
        isNullable: false
      }, {
        name: 'saturday_startHour',
        type: 'time',
        isNullable: false
      }, {
        name: 'saturday_endHour',
        type: 'time',
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
        name: 'FkUsrIdUsrWorkDays',
        referencedTableName: 'users',
        // tabela do USERS
        referencedColumnNames: ['user_id'],
        // nome da coluna LA no user
        columnNames: ['user_id'] //nome da coluna AQUI
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('user_workDays');
  }
}
exports.UserWorkDays1653509194130 = UserWorkDays1653509194130;