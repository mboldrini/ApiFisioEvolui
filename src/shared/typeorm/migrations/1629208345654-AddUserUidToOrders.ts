import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddUserUidToOrders1629208345654 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'user_params', // nome da tabela que ela vai ser adicionada
			new TableColumn({
				name: 'uid_user',
				type: 'varchar',
				isNullable: true,
			}),
		);

		await queryRunner.createForeignKey(
			'user_params',
			new TableForeignKey({
				name: 'ParametrosUser',
				columnNames: ['uid_user'],
				referencedTableName: 'users',
				referencedColumnNames: ['uid'],
				onDelete: 'SET NULL',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('user_params', 'ParametrosUser');
		await queryRunner.dropColumn('user_params', 'uid_user');
	}
}
