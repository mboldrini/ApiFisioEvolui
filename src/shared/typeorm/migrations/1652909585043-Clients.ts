import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Clients1652909585043 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'clients',
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
						name: 'name',
						type: 'varchar(250)',
						isNullable: false,
					},
					{
						name: 'dataNascimento',
						type: 'date',
						isNullable: false,
					},
					{
						name: 'document',
						type: 'varchar(45)',
						isNullable: true,
					},
					{
						name: 'email',
						type: 'varchar(250)',
						isNullable: true,
					},
					{
						name: 'celphone',
						type: 'varchar(15)',
						isNullable: true,
					},
					{
						name: 'second_celphone',
						type: 'varchar(15)',
						isNullable: true,
					},
					{
						name: 'instagram',
						type: 'varchar(250)',
						isNullable: true,
					},
					{
						name: 'enabled',
						type: 'boolean',
						isNullable: true,
					},
					{
						name: 'user_id',
						type: 'int',
						isNullable: false,
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
						name: 'FkUsrUsrIdClients',
						referencedTableName: 'users', // tabela do USERS
						referencedColumnNames: ['user_id'], // nome da coluna LA no user
						columnNames: ['user_id'], //nome da coluna AQUI
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('clients');
	}
}
