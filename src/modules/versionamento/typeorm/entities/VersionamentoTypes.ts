import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('versao')
class Versionamento {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column()
	versao: string;

	@Column()
	novidades: string;

	@Column()
	data_publicacao: Date;

	@Column()
	liberado: boolean;

	@CreateDateColumn({ type: 'timestamp' })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updated_at: Date;
}
export default Versionamento;
