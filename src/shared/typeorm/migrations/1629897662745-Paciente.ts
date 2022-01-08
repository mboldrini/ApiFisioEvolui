// import { MigrationInterface, QueryRunner, Table } from 'typeorm';

// export class Paciente1629897662745 implements MigrationInterface {
// 	public async up(queryRunner: QueryRunner): Promise<void> {
// 		await queryRunner.createTable(
// 			new Table({
// 				name: 'paciente',
// 				columns: [
// 					{
// 						name: 'id',
// 						type: 'int',
// 						isPrimary: true,
// 						isGenerated: true,
// 						generationStrategy: 'increment',
// 					},
// 					{
// 						name: 'nome',
// 						type: 'varchar(140)',
// 						isNullable: false,
// 					},
// 					{
// 						name: 'telefoneCelular',
// 						type: 'varchar(14)',
// 						isNullable: true,
// 					},
// 					{
// 						name: 'telefoneContato',
// 						type: 'varchar(14)',
// 						isNullable: true,
// 					},
// 					{
// 						name: 'email',
// 						type: 'varchar(150)',
// 						isNullable: true,
// 					},
// 					{
// 						name: 'cpf',
// 						type: 'varchar(14)',
// 						isNullable: true,
// 					},
// 					{
// 						name: 'tem_comorbidade',
// 						type: 'boolean',
// 						isNullable: false,
// 					},
// 					{
// 						name: 'comorbidade_descricao',
// 						type: 'varchar(150)',
// 						isNullable: true,
// 					},
// 					{
// 						name: 'ultimoAtendimento',
// 						type: 'date',
// 						isNullable: true,
// 					},
// 					{
// 						name: 'excluido',
// 						type: 'boolean',
// 						isNullable: false,
// 					},
// 					{
// 						name: 'user_uid',
// 						type: 'varchar',
// 						isNullable: true,
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
// 		await queryRunner.dropTable('paciente');
// 	}
// }
