"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaymentMethod1652961839876 = void 0;
var _typeorm = require("typeorm");
class PaymentMethod1652961839876 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'payment_methods',
      columns: [{
        name: 'id',
        type: 'int',
        isPrimary: true,
        isNullable: false,
        isGenerated: true,
        generationStrategy: 'increment'
      }, {
        name: 'name',
        type: 'varchar(150)',
        isNullable: false
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }]
    }));
  }
  async down(queryRunner) {
    await queryRunner.dropTable('payment_methods');
  }
}
exports.PaymentMethod1652961839876 = PaymentMethod1652961839876;