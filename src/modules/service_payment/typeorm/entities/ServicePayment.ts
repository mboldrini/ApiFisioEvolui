import PaymentMethodUser from '@modules/payment_method/paymentMethod_user/typeorm/entities/PaymentMethodUser';
import Appointments from '@modules/appointments/typeorm/entities/Appointments';
import ServicesTypes from '@modules/services_types/typeorm/entities/ServicesTypes';
import User from '@modules/users/users/typeorm/entities/User';
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity('service_payment')
class ServicePayment {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@OneToOne(() => Appointments)
	@JoinColumn({ name: 'appointment_id' })
	@Column({ name: 'appointment_id' })
	appointment_id: number;

	@OneToOne(() => User)
	@JoinColumn({ name: 'user_id' })
	@Column({ name: 'user_id' })
	user_id: number;

	@Column()
	price: number;

	@Column()
	comments: string;

	@Column()
	status: number;

	@Column()
	scheduled: boolean;

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
export default ServicePayment;
