import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Versionamento1666301645436 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'versao',
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
						name: 'versao',
						type: 'varchar(11)',
						isNullable: false,
					},
					{
						name: 'novidades',
						type: 'varchar(500)',
						isNullable: true,
					},
					{
						name: 'data_publicacao',
						type: 'timestamp',
						isNullable: true,
					},
					{
						name: 'liberado',
						type: 'boolean',
						isNullable: false,
						default: true,
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
		await queryRunner.dropTable('versionamento');
	}
}
