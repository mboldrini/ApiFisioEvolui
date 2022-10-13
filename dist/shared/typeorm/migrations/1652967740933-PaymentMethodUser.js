"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaymentMethodUser1652967740933 = void 0;
var _typeorm = require("typeorm");
class PaymentMethodUser1652967740933 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'paymentMethod_User',
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
        name: 'user_id',
        type: 'int',
        isNullable: false
      }, {
        name: 'paymentMethod_id',
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
        name: 'FkUsrIdPMTD',
        referencedTableName: 'users',
        // tabela do USERS
        referencedColumnNames: ['user_id'],
        // nome da coluna LA no user
        columnNames: ['user_id'] //nome da coluna AQUI
      }, {
        name: 'FkPMTTDIdUsr',
        referencedTableName: 'payment_methods',
        // tabela do USERS
        referencedColumnNames: ['id'],
        // nome da coluna LA no user
        columnNames: ['paymentMethod_id'] //nome da coluna AQUI
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('paymentMethod_User');
  }
}
exports.PaymentMethodUser1652967740933 = PaymentMethodUser1652967740933;