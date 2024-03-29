// import { MigrationInterface, QueryRunner, Table } from 'typeorm';

// export class AgendamentoPaciente1643478011671 implements MigrationInterface {
// 	public async up(queryRunner: QueryRunner): Promise<void> {
// 		await queryRunner.createTable(
// 			new Table({
// 				name: 'paciente_agendamentos',
// 				columns: [
// 					{
// 						name: 'id',
// 						type: 'int',
// 						isPrimary: true,
// 						isGenerated: true,
// 						generationStrategy: 'increment',
// 					},
// 					{
// 						name: 'dataTimestamp',
// 						type: 'numeric',
// 						isNullable: false,
// 					},
// 					{
// 						name: 'data',
// 						type: 'Date',
// 						isNullable: false,
// 					},
// 					{
// 						name: 'hora',
// 						type: 'float',
// 						isNullable: true,
// 					},
// 					{
// 						name: 'tipo',
// 						type: 'int',
// 						isNullable: false,
// 					},
// 					{
// 						name: 'status',
// 						type: 'int',
// 						isNullable: false,
// 					},
// 					{
// 						name: 'tempo_atendimento',
// 						type: 'numeric',
// 						isNullable: false,
// 					},
// 					{
// 						name: 'horario_inicioAtendimento',
// 						type: 'numeric',
// 						isNullable: false,
// 					},
// 					{
// 						name: 'horario_fimAtendimento',
// 						type: 'numeric',
// 						isNullable: false,
// 					},
// 					{
// 						name: 'user_id',
// 						type: 'varchar',
// 						isNullable: false,
// 					},
// 					{
// 						name: 'paciente_id',
// 						type: 'int',
// 						isNullable: false,
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
// 						name: 'FkUserUidAgendm',
// 						referencedTableName: 'users', // tabela do USERS
// 						referencedColumnNames: ['id'], // nome da coluna LA no user
// 						columnNames: ['user_id'], //nome da coluna AQUI
// 						onDelete: 'CASCADE',
// 						onUpdate: 'CASCADE',
// 					},
// 					{
// 						name: 'FkPacienteIdAgendm',
// 						referencedTableName: 'pacientes', // tabela do paciente
// 						referencedColumnNames: ['id'], // nome da coluna LA no tipo_atendimento
// 						columnNames: ['paciente_id'], //nome da coluna AQUI
// 						onDelete: 'CASCADE',
// 						onUpdate: 'CASCADE',
// 					},
// 				],
// 			}),
// 		);
// 	}

// 	public async down(queryRunner: QueryRunner): Promise<void> {
// 		await queryRunner.dropTable('paciente_agendamentos');
// 	}
// }
"use strict";