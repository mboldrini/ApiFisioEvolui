// import { MigrationInterface, QueryRunner, Table } from 'typeorm';

// export class Paciente1643462630608 implements MigrationInterface {
// 	public async up(queryRunner: QueryRunner): Promise<void> {
// 		await queryRunner.createTable(
// 			new Table({
// 				name: 'pacientes',
// 				columns: [
// 					{
// 						name: 'id',
// 						type: 'int',
// 						isPrimary: true,
// 						isGenerated: true,
// 						generationStrategy: 'increment',
// 					},
// 					{
// 						name: 'nome',
// 						type: 'varchar(150)',
// 						isNullable: false,
// 					},
// 					{
// 						name: 'cpf',
// 						type: 'varchar(15)',
// 						isNullable: false,
// 					},
// 					{
// 						name: 'dataNascimento',
// 						type: 'varchar(50)',
// 						isNullable: true,
// 					},
// 					{
// 						name: 'celular',
// 						type: 'varchar(15)',
// 						isNullable: false,
// 					},
// 					{
// 						name: 'telefoneRecado',
// 						type: 'varchar(15)',
// 						isNullable: true,
// 					},
// 					{
// 						name: 'email',
// 						type: 'varchar(150)',
// 						isNullable: true,
// 					},
// 					{
// 						name: 'tipoAtendimento',
// 						type: 'int',
// 					},
// 					{
// 						name: 'user_id',
// 						type: 'varchar',
// 					},
// 					{
// 						name: 'temComorbidade',
// 						type: 'boolean',
// 						isNullable: true,
// 					},
// 					{
// 						name: 'logradouro',
// 						type: 'varchar(150)',
// 						isNullable: true,
// 					},
// 					{
// 						name: 'uf',
// 						type: 'int',
// 						isNullable: false,
// 					},
// 					{
// 						name: 'bairro',
// 						type: 'varchar(100)',
// 						isNullable: false,
// 					},
// 					{
// 						name: 'numero',
// 						type: 'varchar(20)',
// 						isNullable: true,
// 					},
// 					{
// 						name: 'referencia',
// 						type: 'varchar(150)',
// 						isNullable: true,
// 					},
// 					{
// 						name: 'excluido',
// 						type: 'boolean',
// 						isNullable: true,
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
// 						name: 'FkUserUidPct',
// 						referencedTableName: 'users', // tabela do USERS
// 						referencedColumnNames: ['id'], // nome da coluna LA no user
// 						columnNames: ['user_id'], //nome da coluna AQUI
// 						onDelete: 'CASCADE',
// 						onUpdate: 'CASCADE',
// 					},
// 					{
// 						name: 'FkTipoAtendimentoId',
// 						referencedTableName: 'paciente_tipoAtendimento', // tabela do tipo_atendimento
// 						referencedColumnNames: ['id'], // nome da coluna LA no tipo_atendimento
// 						columnNames: ['tipoAtendimento'], //nome da coluna AQUI
// 						onDelete: 'CASCADE',
// 						onUpdate: 'CASCADE',
// 					},
// 				],
// 			}),
// 		);
// 	}

// 	public async down(queryRunner: QueryRunner): Promise<void> {
// 		await queryRunner.dropTable('pacientes');
// 	}
// }
"use strict";