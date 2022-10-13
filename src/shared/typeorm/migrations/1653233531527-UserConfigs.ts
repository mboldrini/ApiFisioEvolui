import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class UserConfigs1653233531527 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'users_configs',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isNullable: false,
						isGenerated: true,
						generationStrategy: 'increment',
					},
					{
						name: 'user_id',
						type: 'int',
						isNullable: false,
					},
					{
						name: 'allow_retroactiveDate',
						type: 'boolean',
						isNullable: false,
					},
					{
						name: 'allow_notifications',
						type: 'boolean',
						isNullable: false,
					},
					{
						name: 'schedule_startDay',
						type: 'boolean',
						isNullable: false,
					},
					{
						name: 'user_premium',
						type: 'boolean',
						isNullable: false,
					},
					{
						name: 'premium_type',
						type: 'int',
						isNullable: true,
					},
					{
						name: 'premium_until',
						type: 'date',
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
						name: 'FkUsrIdUsrCfgs',
						referencedTableName: 'users', // tabela do USERS
						referencedColumnNames: ['user_id'], // nome da coluna LA no user
						columnNames: ['user_id'], //nome da coluna AQUI
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('users_configs');
	}
}
