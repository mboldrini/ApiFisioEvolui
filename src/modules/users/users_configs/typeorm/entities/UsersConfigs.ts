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

@Entity('users_configs')
class UsersConfigs {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@OneToOne(() => User)
	@JoinColumn({ name: 'user_id' })
	@Column({ name: 'user_id' })
	user_id: number;

	@Column({ default: false })
	allow_retroactiveDate: boolean;

	@Column({ default: true })
	allow_notifications: boolean;

	@Column({ default: true })
	schedule_startDay: boolean;

	@Column({ default: false })
	user_premium: boolean;

	@Column({ default: 0 })
	premium_type: number;

	@Column({ default: '2050-01-01' })
	premium_until: Date;

	@CreateDateColumn({ type: 'timestamp' })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updated_at: Date;
}
export default UsersConfigs;
