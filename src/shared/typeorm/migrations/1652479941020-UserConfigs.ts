import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class UserConfigs1652479941020 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'user_configs',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment',
					},
					{
						name: 'user_id',
						type: 'varchar',
						isNullable: false,
					},
					{
						name: 'hora_inicioAtendimento',
						type: 'int',
						isNullable: true,
						default: 807274800000,
					},
					{
						name: 'hora_fimAtendimento',
						type: 'int',
						isNullable: true,
						default: 807310800000,
					},
					{
						name: 'tempo_atendimento',
						type: 'int',
						isNullable: true,
						default: 807249000000,
					},
					{
						name: 'tempo_deslocamento',
						type: 'int',
						isNullable: true,
						default: 807246600000,
					},
					{
						name: 'data_retroativa',
						type: 'boolean',
						isNullable: true,
						default: false,
					},
					{
						name: 'notificacoes',
						type: 'boolean',
						isNullable: true,
						default: true,
					},
				],
				foreignKeys: [
					{
						name: 'FkIdUser',
						referencedTableName: 'users', // tabela do USERS
						referencedColumnNames: ['id'], // nome da coluna LA no user
						columnNames: ['user_id'], //nome da coluna AQUI
						onDelete: 'CASCADE',
						onUpdate: 'CASCADE',
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('user_configs');
	}
}
