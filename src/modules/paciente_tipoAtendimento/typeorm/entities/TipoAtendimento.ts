import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('paciente_tipoAtendimento')
class TipoAtendimento {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	tipo: string;

	@Column()
	valor_atendimento: number;

	@Column()
	descricao: string;

	@Column()
	excluido?: boolean;

	@Column()
	user_id: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
export default TipoAtendimento;
