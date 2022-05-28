import PaymentMethodUser from '@modules/payment_method/paymentMethod_user/typeorm/entities/PaymentMethodUser';
import User from '@modules/users/users/typeorm/entities/User';
import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	OneToOne,
	JoinColumn,
} from 'typeorm';

@Entity('services_types')
class ServicesTypes {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column()
	name: string;

	@Column()
	description: string;

	@Column()
	duration: string;

	@Column()
	price: number;

	@OneToOne(() => User)
	@JoinColumn({ name: 'user_id' })
	user_id: number;

	@OneToOne(() => PaymentMethodUser)
	@JoinColumn({ name: 'paymentMethod_id' })
	paymentMethod_id: number;

	@CreateDateColumn({ type: 'timestamp' })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updated_at: Date;
}
export default ServicesTypes;
