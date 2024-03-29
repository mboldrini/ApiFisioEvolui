import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('payment_methods')
class PaymentMethod {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column()
	name: string;

	@CreateDateColumn({ type: 'timestamp' })
	created_at: Date;
}
export default PaymentMethod;
