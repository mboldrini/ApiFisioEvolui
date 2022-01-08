import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsers1629138793563 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'users',
				columns: [
					{
						name: 'id',
						type: 'varchar',
						isPrimary: true,
						isNullable: false,
					},
					{
						name: 'family_name',
						type: 'varchar',
					},
					{
						name: 'given_name',
						type: 'varchar',
						isNullable: false,
					},
					{
						name: 'name',
						type: 'varchar',
						isNullable: false,
					},
					{
						name: 'picture',
						type: 'varchar',
						isNullable: false,
					},
					{
						name: 'email',
						type: 'varchar',
						isUnique: true,
						isNullable: false,
					},
					{
						name: 'crefito',
						type: 'varchar',
					},
					{
						name: 'celular',
						type: 'varchar',
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
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('users');
	}
}
