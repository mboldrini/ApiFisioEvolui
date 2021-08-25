import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Endereco1629891804287 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'endereco',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment',
					},
					{
						name: 'logradouro',
						type: 'varchar',
						isNullable: false,
					},
					{
						name: 'uf',
						type: 'varchar(2)',
						isNullable: false,
					},
					{
						name: 'cep',
						type: 'varchar(9)',
						isNullable: false,
					},
					{
						name: 'bairro',
						type: 'varchar(100)',
						isNullable: false,
					},
					{
						name: 'cidade',
						type: 'varchar(150)',
						isNullable: false,
					},
					{
						name: 'latitude',
						type: 'decimal(25,15)',
						isNullable: true,
					},
					{
						name: 'longitude',
						type: 'decimal(25,15)',
						isNullable: true,
					},
					{
						name: 'user_uid',
						type: 'varchar',
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
						name: 'FkUserUid',
						referencedTableName: 'users', // tabela do USERS
						referencedColumnNames: ['uid'], // nome da coluna LA no user
						columnNames: ['user_uid'], //nome da coluna AQUI
						onDelete: 'CASCADE',
						onUpdate: 'CASCADE',
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('enderecos');
	}
}
