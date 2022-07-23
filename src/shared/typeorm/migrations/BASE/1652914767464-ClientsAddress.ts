import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class ClientsAddress1652914767464 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'clients_address',
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
						name: 'address',
						type: 'varchar(150)',
						isNullable: true,
					},
					{
						name: 'number',
						type: 'int',
						isNullable: true,
					},
					{
						name: 'city',
						type: 'varchar(100)',
						isNullable: true,
					},
					{
						name: 'district',
						type: 'varchar(100)',
						isNullable: true,
					},
					{
						name: 'state',
						type: 'varchar(3)',
						isNullable: true,
					},
					{
						name: 'country',
						type: 'varchar(45)',
						isNullable: true,
					},
					{
						name: 'latitude',
						type: 'varchar(100)',
						isNullable: true,
					},
					{
						name: 'longitude',
						type: 'varchar(100)',
						isNullable: true,
					},
					{
						name: 'client_id',
						type: 'int',
						isNullable: false,
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
						name: 'FkClientId2',
						referencedTableName: 'clients', // tabela do USERS
						referencedColumnNames: ['id'], // nome da coluna LA no user
						columnNames: ['client_id'], //nome da coluna AQUI
					},
					{
						name: 'FUsrIdCliAdrs2',
						referencedTableName: 'users', // tabela do USERS
						referencedColumnNames: ['user_id'], // nome da coluna LA no user
						columnNames: ['user_id'], //nome da coluna AQUI
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('clients_address');
	}
}
