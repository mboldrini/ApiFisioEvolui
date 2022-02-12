import { Column, CreateDateColumn, Entity, UpdateDateColumn, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('paciente_evolucoes')
class Evolucao {
	//@PrimaryColumn('int')
	@PrimaryGeneratedColumn() //<<<< usar isso ao inves da opcao de cima
	id: number;

	@Column()
	evolucao: string;

	@Column()
	observacoes: string;

	@Column()
	status: number;

	@Column()
	tipo: number;

	@Column()
	agendamento_id: number;

	@Column()
	paciente_id: number;

	@Column()
	user_id: string;

	@Column()
	excluido: boolean;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
export default Evolucao;
