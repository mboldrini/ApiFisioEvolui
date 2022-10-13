"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUsers1629138793563 = void 0;
var _typeorm = require("typeorm");
class CreateUsers1629138793563 {
  async up(queryRunner) {
    // await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(new _typeorm.Table({
      name: 'users',
      columns: [{
        name: 'user_id',
        type: 'int',
        isPrimary: true,
        isNullable: false,
        isGenerated: true,
        generationStrategy: 'increment'
      }, {
        name: 'user_code',
        type: 'varchar',
        isNullable: false
      }, {
        name: 'name',
        type: 'varchar(50)',
        isNullable: false
      }, {
        name: 'family_name',
        type: 'varchar(50)',
        isNullable: true
      }, {
        name: 'given_name',
        type: 'varchar(45)',
        isNullable: true
      }, {
        name: 'picture',
        type: 'varchar(250)',
        isNullable: true
      }, {
        name: 'email',
        type: 'varchar(200)',
        isUnique: true,
        isNullable: false
      }, {
        name: 'enabled',
        type: 'boolean',
        isNullable: true,
        default: false
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
    await queryRunner.dropTable('users');
  }
}
exports.CreateUsers1629138793563 = CreateUsers1629138793563;