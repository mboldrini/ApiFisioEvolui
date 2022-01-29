import { Column, CreateDateColumn, Entity, UpdateDateColumn, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('paciente')
class Paciente {
	//@PrimaryColumn('int')
	@PrimaryGeneratedColumn() //<<<< usar isso ao inves da opcao de cima
	id: number;

	@Column()
	nome: string;

	@Column()
	cpf: string;

	@Column()
	dataNascimento: Date;

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
	uf: string;

	@Column()
	bairro: string;

	@Column()
	numero: string;

	@Column()
	referencia: string;

	@Column()
	excluido: number;

	@Column()
	user_id: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
export default Paciente;
