import User from '@modules/users/typeorm/entities/User';
import { Column, CreateDateColumn, Entity, UpdateDateColumn, PrimaryColumn, JoinColumn, ManyToOne } from 'typeorm';

@Entity('user_agenda')
class UserAgenda {
	@PrimaryColumn()
	id: number;

	@Column()
	horario_inicio: number;

	@Column()
	horario_fim: number;

	@Column()
	dia_semana: number;

	@ManyToOne(() => User)
	@JoinColumn({ name: 'user_uid' })
	user_uid: String;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
export default UserAgenda;
