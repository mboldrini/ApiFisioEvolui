import { Column, CreateDateColumn, Entity, UpdateDateColumn, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('paciente_agenda')
class PacienteAgenda {
	//@PrimaryColumn('int')
	@PrimaryGeneratedColumn() //<<<< usar isso ao inves da opcao de cima
	id: number;

	@Column()
	dia_semana: Date;

	@Column()
	data_agendamento: Date;

	@Column()
	horario: number;

	@Column()
	recorrente: boolean;

	@Column()
	limite_recorrencia: boolean;

	@Column()
	data_limite: Date;

	@Column()
	user_uid: string;

	@Column()
	paciente_id: number;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
export default PacienteAgenda;
