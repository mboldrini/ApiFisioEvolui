"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClientAddAddress1659198512917 = void 0;
var _typeorm = require("typeorm");
class ClientAddAddress1659198512917 {
  async up(queryRunner) {
    await queryRunner.addColumn('clients', new _typeorm.TableColumn({
      name: 'address',
      type: 'varchar(200)',
      isNullable: false
    }));
    await queryRunner.addColumn('clients', new _typeorm.TableColumn({
      name: 'latitude',
      type: 'varchar(40)',
      isNullable: true
    }));
    await queryRunner.addColumn('clients', new _typeorm.TableColumn({
      name: 'longitude',
      type: 'varchar(40)',
      isNullable: true
    }));
  }
  async down(queryRunner) {
    await queryRunner.dropColumn('clients', 'address');
    await queryRunner.dropColumn('clients', 'latitude');
    await queryRunner.dropColumn('clients', 'longitude');
  }
}
exports.ClientAddAddress1659198512917 = ClientAddAddress1659198512917;