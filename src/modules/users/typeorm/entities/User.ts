import UserParams from '@modules/params/typeorm/entities/UserParams';
import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	PrimaryColumn,
	OneToOne,
	JoinColumn,
} from 'typeorm';

@Entity('users')
class User {
	@PrimaryColumn()
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

	@OneToOne(() => UserParams, userParams => userParams.user)
	@JoinColumn()
	userParams: UserParams;
}
export default User;
