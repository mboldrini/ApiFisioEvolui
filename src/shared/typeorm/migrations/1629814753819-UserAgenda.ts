// import { MigrationInterface, QueryRunner, Table } from 'typeorm';

// export class UserAgenda1629814753819 implements MigrationInterface {
// 	public async up(queryRunner: QueryRunner): Promise<void> {
// 		await queryRunner.createTable(
// 			new Table({
// 				name: 'user_agenda',
// 				columns: [
// 					{
// 						name: 'id',
// 						type: 'int',
// 						isPrimary: true,
// 						isGenerated: true,
// 						generationStrategy: 'increment',
// 					},
// 					{
// 						name: 'horario_inicio',
// 						type: 'int',
// 						isNullable: false,
// 					},
// 					{
// 						name: 'horario_fim',
// 						type: 'int',
// 						isNullable: false,
// 					},
// 					{
// 						name: 'dia_semana',
// 						type: 'int',
// 						isNullable: false,
// 					},

// 					{
// 						name: 'user_uid',
// 						type: 'varchar',
// 					},
// 					{
// 						name: 'created_at',
// 						type: 'timestamp',
// 						default: 'now()',
// 					},
// 					{
// 						name: 'updated_at',
// 						type: 'timestamp',
// 						default: 'now()',
// 					},
// 				],
// 				foreignKeys: [
// 					{
// 						name: 'FkUserUid',
// 						referencedTableName: 'users', // tabela do USERS
// 						referencedColumnNames: ['uid'], // nome da coluna LA no user
// 						columnNames: ['user_uid'], //nome da coluna AQUI
// 						onDelete: 'CASCADE',
// 						onUpdate: 'CASCADE',
// 					},
// 				],
// 			}),
// 		);
// 	}

// 	public async down(queryRunner: QueryRunner): Promise<void> {
// 		await queryRunner.dropTable('user_agenda');
// 	}
// }
