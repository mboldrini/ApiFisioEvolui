import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class ClientAddServiceType1659203261100 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'clients',
			new TableColumn({
				name: 'serviceType_id',
				type: 'int',
				isNullable: false,
			}),
		);

		await queryRunner.createForeignKey(
			'clients',
			new TableForeignKey({
				columnNames: ['serviceType_id'],
				referencedTableName: 'services_types',
				referencedColumnNames: ['id'],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('clients', 'serviceType_id');
	}
}
