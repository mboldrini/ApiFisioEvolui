import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	OneToOne,
	JoinColumn,
} from 'typeorm';
import User from '../../../users/typeorm/entities/User';

@Entity('users_address')
class UsersAddress {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column()
	address: string;

	@Column()
	number: number;

	@Column()
	city: string;

	@Column()
	district: string;

	@Column()
	state: string;

	@Column()
	country: string;

	@OneToOne(() => User)
	@JoinColumn({ name: 'user_id' })
	user_id: number;

	@CreateDateColumn({ type: 'timestamp' })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updated_at: Date;
}
export default UsersAddress;
