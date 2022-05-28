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

@Entity('user_workDays')
class UserWorkDays {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@OneToOne(() => User)
	@JoinColumn({ name: 'user_id' })
	user_id: number;

	@Column({ default: false })
	sunday: boolean;
	@Column({ default: 'T08:00:00.000-03:00' })
	sunday_startHour: string;
	@Column({ default: 'T08:01:00.000-03:00' })
	sunday_endHour: string;

	@Column({ default: true })
	monday: boolean;
	@Column({ default: 'T08:00:00.000-03:00' })
	monday_startHour: string;
	@Column({ default: 'T18:00:00.000-03:00' })
	monday_endHour: string;

	@Column({ default: true })
	tuesday: boolean;
	@Column({ default: 'T08:00:00.000-03:00' })
	tuesday_startHour: string;
	@Column({ default: 'T18:00:00.000-03:00' })
	tuesday_endHour: string;

	@Column({ default: true })
	wednesday: boolean;
	@Column({ default: 'T08:00:00.000-03:00' })
	wednesday_startHour: string;
	@Column({ default: 'T18:00:00.000-03:00' })
	wednesday_endHour: string;

	@Column({ default: true })
	thursday: boolean;
	@Column({ default: 'T08:00:00.000-03:00' })
	thursday_startHour: string;
	@Column({ default: 'T18:00:00.000-03:00' })
	thursday_endHour: string;

	@Column({ default: true })
	friday: boolean;
	@Column({ default: 'T08:00:00.000-03:00' })
	friday_startHour: string;
	@Column({ default: 'T18:00:00.000-03:00' })
	friday_endHour: string;

	@Column({ default: false })
	saturday: boolean;
	@Column({ default: 'T08:00:00.000-03:00' })
	saturday_startHour: string;
	@Column({ default: 'T12:00:00.000-03:00' })
	saturday_endHour: string;

	@CreateDateColumn({ type: 'timestamp' })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updated_at: Date;
}
export default UserWorkDays;
