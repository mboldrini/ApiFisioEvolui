import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class ClientRespiratoryEval1659121687336 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'clients_respiratoryEval',
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
						name: 'evaluation',
						type: 'varchar(1000)',
						isNullable: false,
					},
					{
						name: 'comments',
						type: 'varchar(500)',
						isNullable: true,
					},
					{
						name: 'date',
						type: 'date',
						isNullable: false,
					},

					{
						name: 'client_id',
						type: 'int',
						isNullable: false,
					},
					{
						name: 'user_id',
						type: 'uuid',
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
						name: 'FkUsrIdRespEv',
						referencedTableName: 'users', // tabela do USERS
						referencedColumnNames: ['user_id'], // nome da coluna LA no user
						columnNames: ['user_id'], //nome da coluna AQUI
					},
					{
						name: 'FkPacienteIdRespev',
						referencedTableName: 'clients', // tabela do USERS
						referencedColumnNames: ['id'], // nome da coluna LA no user
						columnNames: ['client_id'], //nome da coluna AQUI
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('clients_respiratoryEval');
	}
}
