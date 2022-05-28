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

@Entity('users_infos')
class UsersInfos {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column()
	description: string;

	@Column()
	professional_mail: string;

	@Column()
	celphone: string;

	@Column()
	second_celphone: string;

	@Column()
	website: string;

	@Column()
	instagram: string;

	@Column()
	twitter: string;

	@Column()
	tiktok: string;

	@OneToOne(() => User)
	@JoinColumn({ name: 'user_id' })
	user_id: number;

	@CreateDateColumn({ type: 'timestamp' })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updated_at: Date;
}
export default UsersInfos;
