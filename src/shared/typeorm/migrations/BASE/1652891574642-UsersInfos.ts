import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class UsersInfos1652891574642 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'users_infos',
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
						name: 'professional_mail',
						type: 'varchar(150)',
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
						name: 'website',
						type: 'varchar(250)',
						isNullable: true,
					},
					{
						name: 'instagram',
						type: 'varchar(150)',
						isNullable: true,
					},
					{
						name: 'twitter',
						type: 'varchar(250)',
						isNullable: true,
					},
					{
						name: 'tiktok',
						type: 'varchar(250)',
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
						name: 'FkUsrUsrInfos3',
						referencedTableName: 'users', // tabela do USERS
						referencedColumnNames: ['user_id'], // nome da coluna LA no user
						columnNames: ['user_id'], //nome da coluna AQUI
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
