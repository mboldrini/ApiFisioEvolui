import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class RemoveUfPaciente1650461705408 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('pacientes', 'uf');
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}

