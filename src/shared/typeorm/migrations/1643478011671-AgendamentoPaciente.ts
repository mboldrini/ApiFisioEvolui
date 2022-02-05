import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AgendamentoPaciente1643478011671 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'paciente_agendamento',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment',
					},
					{
						name: 'dataHora',
						type: 'varchar(50)',
						isNullable: false,
					},
					{
						name: 'data',
						type: 'Date',
						isNullable: false,
					},
					{
						name: 'tipo',
						type: 'int',
						isNullable: false,
					},
					{
						name: 'status',
						type: 'int',
						isNullable: false,
					},
					{
						name: 'user_id',
						type: 'varchar',
						isNullable: false,
					},
					{
						name: 'paciente_id',
						type: 'int',
						isNullable: false,
					},
					{
						name: 'excluido',
						type: 'boolean',
						isNullable: true,
					},
					{
						name: 'created_at',
						type: 'timestamp',
						default: 'now()',
					},
					{
						name: 'updated_at',
						type: 'timestamp',
						default: 'now()',
					},
				],
				foreignKeys: [
					{
						name: 'FkUserUid',
						referencedTableName: 'users', // tabela do USERS
						referencedColumnNames: ['id'], // nome da coluna LA no user
						columnNames: ['user_id'], //nome da coluna AQUI
						onDelete: 'CASCADE',
						onUpdate: 'CASCADE',
					},
					{
						name: 'FkPacienteId',
						referencedTableName: 'paciente', // tabela do paciente
						referencedColumnNames: ['id'], // nome da coluna LA no tipo_atendimento
						columnNames: ['paciente_id'], //nome da coluna AQUI
						onDelete: 'CASCADE',
						onUpdate: 'CASCADE',
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('paciente_agendamento');
	}
}
