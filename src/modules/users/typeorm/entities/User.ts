import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
class User {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column()
	uid: string;

	@Column()
	nome: string;

	@Column()
	email: string;

	@Column()
	celular: string;

	@Column()
	instagram: string;

	@Column()
	crefito: string;

	@Column()
	dtNascimento: Date;

	@Column()
	cpfcnpj: string;

	@Column('int')
	excluido: number;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
export default User;
