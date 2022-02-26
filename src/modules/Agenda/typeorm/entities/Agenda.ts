import {
	Column,
	CreateDateColumn,
	Entity,
	UpdateDateColumn,
	PrimaryColumn,
	PrimaryGeneratedColumn,
	ManyToOne,
	JoinColumn,
	OneToOne,
} from 'typeorm';

import Paciente from '../../../paciente/typeorm/entities/Paciente';

@Entity('paciente_agendamento')
class Agenda {
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

	//@OneToOne(() => Paciente, paciente => paciente.id)
	//@JoinColumn({ name: 'paciente_id' })
	//user_id: Paciente;
	@Column()
	user_id: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
export default Agenda;
