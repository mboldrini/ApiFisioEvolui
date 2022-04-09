import { Column, CreateDateColumn, Entity, UpdateDateColumn, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('paciente_agendamentos')
class Agendamento {
	//@PrimaryColumn('int')
	@PrimaryGeneratedColumn() //<<<< usar isso ao inves da opcao de cima
	id: number;

	@Column()
	dataHora: string;

	@Column()
	data: Date;

	@Column()
	hora: number;

	@Column()
	tipo: number;

	@Column()
	status: number;

	@Column()
	paciente_id: number;

	@Column()
	excluido: boolean;

	@Column()
	user_id: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
export default Agendamento;
