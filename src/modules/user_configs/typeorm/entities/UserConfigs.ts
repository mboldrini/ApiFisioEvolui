import { Column, CreateDateColumn, Entity, UpdateDateColumn, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity('user_configs')
class UserConfigs {
	@PrimaryColumn()
	id: number;

	@Column()
	user_id: string;

	@Column()
	hora_inicioAtendimento: number;

	@Column()
	hora_fimAtendimento: number;

	@Column()
	tempo_atendimento: number;

	@Column()
	ignorar_tempoDeslocamento: boolean;

	@Column()
	tempo_deslocamento: number;

	@Column()
	data_retroativa: boolean;

	@Column()
	notificacoes: boolean;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
export default UserConfigs;
