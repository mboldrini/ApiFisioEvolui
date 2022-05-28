import Clients from '@modules/clients/clients/typeorm/entities/Clients';
import PaymentMethod from '@modules/payment_method/payment_method/typeorm/entities/PaymentMethod';
import ServicesTypes from '@modules/services_types/typeorm/entities/ServicesTypes';
import User from '@modules/users/users/typeorm/entities/User';
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToMany,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity('appointments')
class Appointments {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column()
	description: string;

	@Column()
	comments: string;

	@Column()
	status: number;

	@Column()
	type: number;

	@Column()
	date_scheduled: Date;

	@Column()
	start_hour: string;

	@Column()
	end_hour: string;

	@Column()
	duration: string;

	@Column()
	price: number;

	@Column()
	scheduled: boolean;

	@OneToOne(() => User)
	@JoinColumn({ name: 'user_id' })
	@Column({ name: 'user_id' })
	user_id: number;

	@OneToOne(() => Clients)
	@JoinColumn({ name: 'client_id' })
	@Column({ name: 'client_id' })
	client_id: number;

	@OneToOne(() => ServicesTypes)
	@JoinColumn({ name: 'serviceType_id' })
	@Column({ name: 'serviceType_id' })
	serviceType_id: number;

	@CreateDateColumn({
		type: 'timestamp',
		default: new Date().toLocaleString(),
	})
	created_at: Date;

	@UpdateDateColumn({
		type: 'timestamp',
		default: new Date().toLocaleString(),
	})
	updated_at: Date;
}
export default Appointments;
