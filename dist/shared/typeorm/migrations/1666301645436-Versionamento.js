"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Versionamento1666301645436 = void 0;
var _typeorm = require("typeorm");
class Versionamento1666301645436 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'versao',
      columns: [{
        name: 'id',
        type: 'int',
        isPrimary: true,
        isNullable: false,
        isGenerated: true,
        generationStrategy: 'increment'
      }, {
        name: 'versao',
        type: 'varchar(11)',
        isNullable: false
      }, {
        name: 'novidades',
        type: 'varchar(500)',
        isNullable: true
      }, {
        name: 'data_publicacao',
        type: 'timestamp',
        isNullable: true
      }, {
        name: 'liberado',
        type: 'boolean',
        isNullable: false,
        default: true
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()'
      }]
    }));
  }
  async down(queryRunner) {
    await queryRunner.dropTable('versionamento');
  }
}
exports.Versionamento1666301645436 = Versionamento1666301645436;