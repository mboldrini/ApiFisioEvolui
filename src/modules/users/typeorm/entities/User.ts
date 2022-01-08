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
	id: string;

	@Column()
	family_name: string;

	@Column()
	given_name: string;

	@Column()
	name: string;

	@Column()
	picture: string;

	@Column()
	email: string;

	@Column()
	crefito: string;

	@Column()
	celular: string;

	@Column('int')
	excluido: number;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
export default User;
