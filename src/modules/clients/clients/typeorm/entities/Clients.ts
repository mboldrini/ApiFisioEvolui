import ServicesTypes from '@modules/services_types/typeorm/entities/ServicesTypes';
import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	OneToOne,
	JoinColumn,
} from 'typeorm';
import User from '../../../../users/users/typeorm/entities/User';

@Entity('clients')
class Clients {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column()
	name: string;

	@Column()
	dataNascimento: Date;

	@Column()
	document: string;

	@Column()
	email: string;

	@Column()
	celphone: string;

	@Column()
	second_celphone: string;

	@Column()
	instagram: string;

	@Column()
	address: string;

	@Column()
	latitude: string;

	@Column()
	longitude: string;

	@Column()
	enabled: boolean;

	@OneToOne(() => User)
	@JoinColumn({ name: 'user_id' })
	user_id: number;

	@Column({ name: 'serviceType_id' })
	@OneToOne(() => ServicesTypes)
	@JoinColumn({ name: 'serviceType_id' })
	serviceType_id: number;

	@CreateDateColumn({ type: 'timestamp' })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updated_at: Date;
}
export default Clients;
