// import { number } from 'joi';
// import { MigrationInterface, QueryRunner, Table } from 'typeorm';

// export class PacienteEvolucoes1644694262402 implements MigrationInterface {
// 	public async up(queryRunner: QueryRunner): Promise<void> {
// 		await queryRunner.createTable(
// 			new Table({
// 				name: 'paciente_evolucoes',
// 				columns: [
// 					{
// 						name: 'id',
// 						type: 'int',
// 						isPrimary: true,
// 						isGenerated: true,
// 						generationStrategy: 'increment',
// 					},
// 					{
// 						name: 'evolucao',
// 						type: 'varchar(2500)',
// 						isNullable: false,
// 					},
// 					{
// 						name: 'observacoes',
// 						type: 'varchar(2500)',
// 						isNullable: true,
// 					},
// 					{
// 						name: 'status',
// 						type: 'int',
// 						isNullable: false,
// 					},
// 					{
// 						name: 'tipo',
// 						type: 'int',
// 						isNullable: true,
// 					},
// 					{
// 						name: 'agendamento_id',
// 						type: 'int',
// 						isNullable: false,
// 					},
// 					{
// 						name: 'paciente_id',
// 						type: 'int',
// 						isNullable: false,
// 					},
// 					{
// 						name: 'user_id',
// 						type: 'varchar',
// 						isNullable: false,
// 					},
// 					{
// 						name: 'excluido',
// 						type: 'boolean',
// 						isNullable: false,
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
// 						name: 'FkUserUidEvol',
// 						referencedTableName: 'users', // tabela do USERS
// 						referencedColumnNames: ['id'], // nome da coluna LA no user
// 						columnNames: ['user_id'], //nome da coluna AQUI
// 						onDelete: 'CASCADE',
// 						onUpdate: 'CASCADE',
// 					},
// 					{
// 						name: 'FkPacienteIdEvol',
// 						referencedTableName: 'pacientes', // tabela do paciente
// 						referencedColumnNames: ['id'], // nome da coluna LA no tipo_atendimento
// 						columnNames: ['paciente_id'], //nome da coluna AQUI
// 						onDelete: 'CASCADE',
// 						onUpdate: 'CASCADE',
// 					},
// 					{
// 						name: 'FkAgendamentoIdEvol',
// 						referencedTableName: 'paciente_agendamentos', // tabela do agendamento
// 						referencedColumnNames: ['id'], // nome da coluna LA no paciente_agendamento
// 						columnNames: ['agendamento_id'], //nome da coluna AQUI
// 						onDelete: 'CASCADE',
// 						onUpdate: 'CASCADE',
// 					},
// 				],
// 			}),
// 		);
// 	}

// 	public async down(queryRunner: QueryRunner): Promise<void> {}
// }
