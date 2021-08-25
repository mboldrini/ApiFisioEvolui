import User from '@modules/users/typeorm/entities/User';
import { EntityRepository, Repository } from 'typeorm';
import Endereco from '../entities/Endereco';

interface ITeste {
	logradouro: string;
	uf: string;
	cep: string;
	bairro: string;
	cidade: string;
	latitude: number;
	longitude: number;
	user_uid: string;
	paciente_id: number;
}

@EntityRepository(Endereco)
export class EnderecoRepository extends Repository<Endereco> {
	public async findByUid(uid: string): Promise<Endereco | undefined> {
		const user = await this.findOne({
			where: {
				user_uid: uid,
			},
		});
		return user;
	}
	public async findByUidAndId(uid: string, id: number): Promise<Endereco | undefined> {
		const user = await this.findOne({
			where: {
				user_uid: uid,
				id: id,
			},
		});
		return user;
	}
}
export default EnderecoRepository;
