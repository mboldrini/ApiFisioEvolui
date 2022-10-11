// import { MigrationInterface, QueryRunner, Table } from 'typeorm';

// export class TiposPaciente1642960690259 implements MigrationInterface {
// 	public async up(queryRunner: QueryRunner): Promise<void> {
// 		await queryRunner.createTable(
// 			new Table({
// 				name: 'paciente_tipoAtendimento',
// 				columns: [
// 					{
// 						name: 'id',
// 						type: 'int',
// 						isPrimary: true,
// 						isGenerated: true,
// 						generationStrategy: 'increment',
// 					},
// 					{
// 						name: 'tipo',
// 						type: 'varchar',
// 						isNullable: false,
// 					},
// 					{
// 						name: 'valor_atendimento',
// 						type: 'float',
// 						isNullable: false,
// 					},
// 					{
// 						name: 'descricao',
// 						type: 'varchar',
// 						isNullable: true,
// 					},
// 					{
// 						name: 'excluido',
// 						type: 'boolean',
// 						isNullable: true,
// 					},
// 					{
// 						name: 'user_id',
// 						type: 'varchar',
// 					},
// 					{
// 						name: 'created_at',
// 						type: 'timestamp',
// 						default: 'now()',
// 					},
// 					{
// 						name: 'updated_at',
// 						type: 'timestamp',
// 						default: 'now()',
// 					},
// 				],
// 				foreignKeys: [
// 					{
// 						name: 'FkUserUid',
// 						referencedTableName: 'users', // tabela do USERS
// 						referencedColumnNames: ['id'], // nome da coluna LA no user
// 						columnNames: ['user_id'], //nome da coluna AQUI
// 						onDelete: 'CASCADE',
// 						onUpdate: 'CASCADE',
// 					},
// 				],
// 			}),
// 		);
// 	}

// 	public async down(queryRunner: QueryRunner): Promise<void> {
// 		await queryRunner.dropTable('paciente_tipoAtendimento');
// 	}
// }
"use strict";