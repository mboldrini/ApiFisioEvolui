import { number } from 'joi';
import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddPacienteIdToEndereco1629908781358 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'endereco',
			new TableColumn({
				name: 'paciente_id',
				type: 'int',
				isNullable: true,
			}),
		);

		await queryRunner.createForeignKey(
			'endereco',
			new TableForeignKey({
				name: 'FkPacienteId',
				columnNames: ['paciente_id'],
				referencedTableName: 'paciente',
				referencedColumnNames: ['id'],
				onDelete: 'SET NULL',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('endereco', 'FkPacienteId');
		await queryRunner.dropColumn('endereco', 'paciente_id');
	}
}
