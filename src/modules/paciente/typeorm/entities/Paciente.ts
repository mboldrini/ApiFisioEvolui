import { Column, CreateDateColumn, Entity, UpdateDateColumn, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pacientes')
class Paciente {
	//@PrimaryColumn('int')
	@PrimaryGeneratedColumn() //<<<< usar isso ao inves da opcao de cima
	id: number;

	@Column()
	nome: string;

	@Column()
	cpf: string;

	@Column()
	dataNascimento: string;

	@Column()
	celular: string;

	@Column()
	telefoneRecado: string;

	@Column()
	email: string;

	@Column()
	tipoAtendimento: number;

	@Column()
	temComorbidade: boolean;

	@Column()
	logradouro: string;

	@Column()
	bairro: string;

	@Column()
	referencia: string;

	@Column()
	excluido: boolean;

	@Column()
	user_id: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@Column()
	queixamotivo: string;

	@Column()
	diagnosticos: string;

	@Column()
	comorbidades: string;
}
export default Paciente;
