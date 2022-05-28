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
import Client from '../../../clients/typeorm/entities/Clients';

@Entity('clients_address')
class ClientsAddress {
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
	@Column()
	user_id: number;

	@OneToOne(() => Client)
	@JoinColumn({ name: 'client_id' })
	@Column()
	client_id: number;

	@CreateDateColumn({ type: 'timestamp' })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updated_at: Date;
}
export default ClientsAddress;
