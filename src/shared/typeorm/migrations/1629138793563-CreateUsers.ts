import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsers1629138793563 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'users',
				columns: [
					{
						name: 'user_id',
						type: 'int',
						isPrimary: true,
						isNullable: false,
						isGenerated: true,
						generationStrategy: 'increment',
					},
					{
						name: 'user_code',
						type: 'varchar(250)',
						isNullable: false,
					},
					{
						name: 'name',
						type: 'varchar(50)',
						isNullable: false,
					},
					{
						name: 'family_name',
						type: 'varchar(50)',
						isNullable: true,
					},
					{
						name: 'given_name',
						type: 'varchar(45)',
						isNullable: true,
					},

					{
						name: 'picture',
						type: 'varchar(250)',
						isNullable: true,
					},
					{
						name: 'email',
						type: 'varchar(200)',
						isUnique: true,
						isNullable: false,
					},
					{
						name: 'enabled',
						type: 'boolean',
						isNullable: true,
						default: false,
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
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('users');
	}
}
