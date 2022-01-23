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

@Entity('tipo_atendimento')
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
