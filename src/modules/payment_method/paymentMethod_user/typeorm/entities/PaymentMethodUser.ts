import PaymentMethod from '@modules/payment_method/payment_method/typeorm/entities/PaymentMethod';
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

@Entity('paymentmethod_user')
class PaymentMethodUser {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column()
	description: string;

	@OneToOne(() => User)
	@JoinColumn({ name: 'user_id' })
	@Column({ name: 'user_id' })
	user_id: number;

	@OneToOne(() => PaymentMethod)
	@JoinColumn({ name: 'paymentMethod_id' })
	@Column({ name: 'paymentMethod_id' })
	paymentMethod_id: number;

	@CreateDateColumn({ type: 'timestamp' })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updated_at: Date;
}
export default PaymentMethodUser;
