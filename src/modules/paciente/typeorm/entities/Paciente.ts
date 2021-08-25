import { Column, CreateDateColumn, Entity, UpdateDateColumn, PrimaryColumn } from 'typeorm';

@Entity('paciente')
class Paciente {
	@PrimaryColumn('int')
	id: number;

	@Column()
	nome: string;

	@Column()
	telefoneCelular: string;

	@Column()
	telefoneContato: string;

	@Column()
	email: string;

	@Column()
	cpf: string;

	@Column()
	tem_comorbidade: number;

	@Column()
	comorbidade_descricao: string;

	@Column()
	ultimoAtendimento: Date;

	@Column()
	excluido: number;

	@Column()
	user_uid: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
export default Paciente;
