import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AtendimentoPagamento1649534498236 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'paciente_pagamentos',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment',
					},
					{
						name: 'id_paciente',
						type: 'int',
						isNullable: false,
					},
					{
						name: 'id_evolucao',
						type: 'int',
						isNullable: false,
					},
					{
						name: 'id_user',
						type: 'varchar',
						isNullable: false,
					},
					{
						name: 'status',
						type: 'int',
						isNullable: false,
					},
					{
						name: 'valor',
						type: 'float',
						isNullable: false,
					},
					{
						name: 'observacoes',
						type: 'varchar(2500)',
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
						name: 'FkIdPaciente',
						referencedTableName: 'pacientes', // tabela do USERS
						referencedColumnNames: ['id'], // nome da coluna LA no user
						columnNames: ['id_paciente'], //nome da coluna AQUI
						onDelete: 'CASCADE',
						onUpdate: 'CASCADE',
					},
					{
						name: 'FkIdAtendimento',
						referencedTableName: 'paciente_evolucoes', // tabela do USERS
						referencedColumnNames: ['id'], // nome da coluna LA no user
						columnNames: ['id_paciente'], //nome da coluna AQUI
						onDelete: 'CASCADE',
						onUpdate: 'CASCADE',
					},
					{
						name: 'FkIdUser',
						referencedTableName: 'users', // tabela do USERS
						referencedColumnNames: ['id'], // nome da coluna LA no user
						columnNames: ['id_user'], //nome da coluna AQUI
						onDelete: 'CASCADE',
						onUpdate: 'CASCADE',
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('paciente_pagamentos');
	}
}
