import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Appointments1653153218339 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'appointments',
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
						name: 'description',
						type: 'varchar(250)',
						isNullable: true,
					},
					{
						name: 'comments',
						type: 'varchar(250)',
						isNullable: true,
					},
					{
						name: 'status',
						type: 'int',
						isNullable: false,
					},
					{
						name: 'type',
						type: 'int',
						isNullable: false,
					},
					{
						name: 'date_scheduled',
						type: 'date',
						isNullable: false,
					},
					{
						name: 'start_hour',
						type: 'time',
						isNullable: false,
					},
					{
						name: 'duration',
						type: 'time',
						isNullable: false,
					},
					{
						name: 'end_hour',
						type: 'time',
						isNullable: false,
					},
					{
						name: 'price',
						type: 'decimal(15,2)',
						isNullable: false,
					},
					{
						name: 'scheduled',
						type: 'boolean',
						isNullable: false,
					},
					{
						name: 'user_id',
						type: 'uuid',
						isNullable: false,
					},
					{
						name: 'client_id',
						type: 'int',
						isNullable: false,
					},
					{
						name: 'serviceType_id',
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
						name: 'FkUsrIdAppntmn',
						referencedTableName: 'users', // tabela do USERS
						referencedColumnNames: ['user_id'], // nome da coluna LA no user
						columnNames: ['user_id'], //nome da coluna AQUI
					},
					{
						name: 'FkClientIdAppntmn',
						referencedTableName: 'clients', // tabela do USERS
						referencedColumnNames: ['id'], // nome da coluna LA no user
						columnNames: ['client_id'], //nome da coluna AQUI
					},
					{
						name: 'FkSrvcTypIdAppntmn',
						referencedTableName: 'services_types', // tabela do USERS
						referencedColumnNames: ['id'], // nome da coluna LA no user
						columnNames: ['serviceType_id'], //nome da coluna AQUI
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('appointments');
	}
}
