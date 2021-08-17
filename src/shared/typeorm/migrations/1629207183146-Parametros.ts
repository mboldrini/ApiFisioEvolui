import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class parametros1629207183146 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'user_params',
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
		await queryRunner.dropTable('user_params');
	}
}
