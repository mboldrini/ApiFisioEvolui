import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsers1629138793563 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'users',
				columns: [
					// {
					// 	name: 'id',
					// 	type: 'int',
					// 	isPrimary: true,
					// 	isGenerated: true,
					// 	generationStrategy: 'increment',
					// },
					{
						name: 'uid',
						type: 'varchar',
						isPrimary: true,
						isNullable: false,
					},
					{
						name: 'nome',
						type: 'varchar',
					},
					{
						name: 'email',
						type: 'varchar(100)',
						isUnique: true,
					},
					{
						name: 'celular',
						type: 'varchar(14)',
						isNullable: true,
					},
					{
						name: 'instagram',
						type: 'varchar(100)',
						isNullable: true,
					},
					{
						name: 'crefito',
						type: 'varchar(15)',
					},
					{
						name: 'dtNascimento',
						type: 'date',
					},
					{
						name: 'cpfcnpj',
						type: 'varchar(25)',
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
