import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class NovosCamposPaciente1645273411262 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'paciente',
			new TableColumn({
				name: 'queixamotivo',
				type: 'varchar(2500)',
				isNullable: true,
			}),
		);

		await queryRunner.addColumn(
			'paciente',
			new TableColumn({
				name: 'diagnosticos',
				type: 'varchar(2500)',
				isNullable: true,
			}),
		);

		await queryRunner.addColumn(
			'paciente',
			new TableColumn({
				name: 'comorbidades',
				type: 'varchar(2500)',
				isNullable: true,
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('paciente', 'queixamotivo');
		await queryRunner.dropColumn('paciente', 'diagnosticos');
		await queryRunner.dropColumn('paciente', 'comorbidades');
	}
}
