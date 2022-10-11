"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClientAddServiceType1659203261100 = void 0;
var _typeorm = require("typeorm");
class ClientAddServiceType1659203261100 {
  async up(queryRunner) {
    await queryRunner.addColumn('clients', new _typeorm.TableColumn({
      name: 'serviceType_id',
      type: 'int',
      isNullable: false
    }));
    await queryRunner.createForeignKey('clients', new _typeorm.TableForeignKey({
      columnNames: ['serviceType_id'],
      referencedTableName: 'services_types',
      referencedColumnNames: ['id']
    }));
  }
  async down(queryRunner) {
    await queryRunner.dropColumn('clients', 'serviceType_id');
  }
}
exports.ClientAddServiceType1659203261100 = ClientAddServiceType1659203261100;