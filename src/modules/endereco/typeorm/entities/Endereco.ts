import { Column, CreateDateColumn, Entity, UpdateDateColumn, PrimaryColumn } from 'typeorm';

@Entity('endereco')
class Endereco {
	@PrimaryColumn()
	id: number;

	@Column()
	logradouro: string;

	@Column()
	uf: string;

	@Column()
	cep: string;

	@Column()
	bairro: string;

	@Column()
	cidade: string;

	@Column()
	latitude: number;

	@Column()
	longitude: number;

	@Column()
	user_uid: string;

	@Column()
	paciente_id: number;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
export default Endereco;
