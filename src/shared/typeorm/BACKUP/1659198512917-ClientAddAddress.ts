import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class ClientAddAddress1659198512917 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'clients',
			new TableColumn({
				name: 'address',
				type: 'varchar(200)',
				isNullable: false,
			}),
		);

		await queryRunner.addColumn(
			'clients',
			new TableColumn({
				name: 'latitude',
				type: 'varchar(40)',
				isNullable: true,
			}),
		);

		await queryRunner.addColumn(
			'clients',
			new TableColumn({
				name: 'longitude',
				type: 'varchar(40)',
				isNullable: true,
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('clients', 'address');
		await queryRunner.dropColumn('clients', 'latitude');
		await queryRunner.dropColumn('clients', 'longitude');
	}
}
