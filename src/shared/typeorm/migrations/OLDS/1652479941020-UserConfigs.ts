// import { MigrationInterface, QueryRunner, Table } from 'typeorm';

// export class UserConfigs1652479941020 implements MigrationInterface {
// 	public async up(queryRunner: QueryRunner): Promise<void> {
// 		await queryRunner.createTable(
// 			new Table({
// 				name: 'user_configs',
// 				columns: [
// 					{
// 						name: 'id',
// 						type: 'int',
// 						isPrimary: true,
// 						isGenerated: true,
// 						generationStrategy: 'increment',
// 					},
// 					{
// 						name: 'user_id',
// 						type: 'varchar',
// 						isNullable: false,
// 					},
// 					{
// 						name: 'hora_inicioAtendimento',
// 						type: 'int',
// 						isNullable: true,
// 					},
// 					{
// 						name: 'hora_fimAtendimento',
// 						type: 'int',
// 						isNullable: true,
// 					},
// 					{
// 						name: 'tempo_atendimento',
// 						type: 'int',
// 						isNullable: true,
// 					},
// 					{
// 						name: 'ignorar_tempoDeslocamento',
// 						type: 'boolean',
// 						isNullable: true,
// 						default: true,
// 					},
// 					{
// 						name: 'tempo_deslocamento',
// 						type: 'int',
// 						isNullable: true,
// 					},
// 					{
// 						name: 'data_retroativa',
// 						type: 'boolean',
// 						isNullable: true,
// 						default: false,
// 					},
// 					{
// 						name: 'notificacoes',
// 						type: 'int',
// 						isNullable: true,
// 						default: true,
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
// 						name: 'FkIdUserCfgs',
// 						referencedTableName: 'users', // tabela do USERS
// 						referencedColumnNames: ['id'], // nome da coluna LA no user
// 						columnNames: ['user_id'], //nome da coluna AQUI
// 						onDelete: 'CASCADE',
// 						onUpdate: 'CASCADE',
// 					},
// 				],
// 			}),
// 		);
// 	}

// 	public async down(queryRunner: QueryRunner): Promise<void> {
// 		await queryRunner.dropTable('user_configs');
// 	}
// }
