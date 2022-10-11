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

@Entity('clients_hda')
class ClientHDA {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column()
	hda: string;

	@Column()
	comments: string;

	@Column()
	date: Date;

	@OneToOne(() => Client)
	@JoinColumn({ name: 'client_id' })
	@Column()
	client_id: number;

	@OneToOne(() => User)
	@JoinColumn({ name: 'user_id' })
	@Column()
	user_id: number;

	@CreateDateColumn({ type: 'timestamp' })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updated_at: Date;
}
export default ClientHDA;
