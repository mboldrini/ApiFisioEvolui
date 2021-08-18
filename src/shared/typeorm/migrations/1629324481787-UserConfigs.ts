import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class UserConfigs1629324481787 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'user_configs',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment',
					},
					{
						name: 'atendimento_duracao',
						type: 'varchar(4)',
						isNullable: false,
					},
					{
						name: 'agenda_retroativo',
						type: 'boolean',
						isNullable: false,
					},
					{
						name: 'evolucao_repetir',
						type: 'boolean',
						isNullable: false,
					},
					{
						name: 'pagamento_valor',
						type: 'varchar(14)',
						isNullable: true,
					},
					{
						name: 'user_uid',
						type: 'varchar',
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
		await queryRunner.dropTable('user_configs');
	}
}
