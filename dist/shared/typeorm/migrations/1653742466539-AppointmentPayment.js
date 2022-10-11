"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppointmentPayment1653742466539 = void 0;
var _typeorm = require("typeorm");
class AppointmentPayment1653742466539 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'service_payment',
      columns: [{
        name: 'id',
        type: 'int',
        isPrimary: true,
        isNullable: false,
        isGenerated: true,
        generationStrategy: 'increment'
      }, {
        name: 'appointment_id',
        type: 'int',
        isNullable: false
      }, {
        name: 'user_id',
        type: 'int',
        isNullable: false
      }, {
        name: 'price',
        type: 'decimal(15,2)',
        isNullable: false
      }, {
        name: 'comments',
        type: 'varchar(250)',
        isNullable: true
      }, {
        name: 'status',
        type: 'int',
        isNullable: false
      }, {
        name: 'scheduled',
        type: 'boolean',
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
        name: 'FkUsrIdPayment',
        referencedTableName: 'users',
        // tabela do USERS
        referencedColumnNames: ['user_id'],
        // nome da coluna LA no user
        columnNames: ['user_id'] //nome da coluna AQUI
      }, {
        name: 'FkAppointmentIdPayment',
        referencedTableName: 'appointments',
        // tabela do USERS
        referencedColumnNames: ['id'],
        // nome da coluna LA no user
        columnNames: ['appointment_id'] //nome da coluna AQUI
      }, {
        name: 'FkServiceTypeIdPmtdAppntm',
        referencedTableName: 'services_types',
        // tabela do USERS
        referencedColumnNames: ['id'],
        // nome da coluna LA no user
        columnNames: ['serviceType_id'] //nome da coluna AQUI
      }]
    }));
  }

  async down(queryRunner) {}
}
exports.AppointmentPayment1653742466539 = AppointmentPayment1653742466539;