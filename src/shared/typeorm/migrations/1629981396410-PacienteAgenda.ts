// import { date } from 'joi';
// import { MigrationInterface, QueryRunner, Table } from 'typeorm';

// export class PacienteAgenda1629981396410 implements MigrationInterface {
// 	public async up(queryRunner: QueryRunner): Promise<void> {
// 		await queryRunner.createTable(
// 			new Table({
// 				name: 'paciente_agenda',
// 				columns: [
// 					{
// 						name: 'id',
// 						type: 'int',
// 						isPrimary: true,
// 						isGenerated: true,
// 						generationStrategy: 'increment',
// 					},
// 					{
// 						name: 'dia_semana',
// 						type: 'int',
// 						isNullable: false,
// 					},
// 					{
// 						name: 'data_agendamento',
// 						type: 'date',
// 						isNullable: false,
// 					},
// 					{
// 						name: 'recorrente',
// 						type: 'boolean',
// 						isNullable: false,
// 					},
// 					{
// 						name: 'horario',
// 						type: 'int',
// 						isNullable: false,
// 					},
// 					{
// 						name: 'limite_recorrencia',
// 						type: 'boolean',
// 						isNullable: false,
// 					},
// 					{
// 						name: 'data_limite',
// 						type: 'date',
// 						isNullable: true,
// 					},
// 					{
// 						name: 'user_uid',
// 						type: 'varchar',
// 					},
// 					{
// 						name: 'paciente_id',
// 						type: 'int',
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
// 						referencedColumnNames: ['uid'], // nome da coluna LA no user
// 						columnNames: ['user_uid'], //nome da coluna AQUI
// 						onDelete: 'CASCADE',
// 						onUpdate: 'CASCADE',
// 					},
// 					{
// 						name: 'FkPacienteId',
// 						referencedTableName: 'paciente', // tabela do USERS
// 						referencedColumnNames: ['id'], // nome da coluna LA no user
// 						columnNames: ['paciente_id'], //nome da coluna AQUI
// 						onDelete: 'CASCADE',
// 						onUpdate: 'CASCADE',
// 					},
// 				],
// 			}),
// 		);
// 	}

// 	public async down(queryRunner: QueryRunner): Promise<void> {
// 		await queryRunner.dropTable('paciente_agenda');
// 	}
// }
