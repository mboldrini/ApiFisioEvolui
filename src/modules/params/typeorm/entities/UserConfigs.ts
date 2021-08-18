import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	PrimaryColumn,
	OneToOne,
	JoinColumn,
} from 'typeorm';

@Entity('user_configs')
class UserConfigs {
	@PrimaryColumn()
	id: number;

	@Column()
	atendimento_duracao: string;

	@Column()
	agenda_retroativo: number;

	@Column()
	evolucao_repetir: number;

	@Column()
	pagamento_valor: string;

	@Column()
	user_uid: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
export default UserConfigs;
