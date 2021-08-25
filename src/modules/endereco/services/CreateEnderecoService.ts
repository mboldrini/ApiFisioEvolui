import { EnderecoRepository } from './../typeorm/repositories/EnderecoRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Endereco from '../typeorm/entities/Endereco';

interface IRequest {
	logradouro: string;
	uf: string;
	cep: string;
	bairro: string;
	cidade: string;
	latitude: number;
	longitude: number;
	user_uid: string;
	paciente_id?: number;
}

class CreateEnderecoService {
	public async execute({
		logradouro,
		uf,
		cep,
		bairro,
		cidade,
		latitude,
		longitude,
		user_uid,
		paciente_id,
	}: IRequest): Promise<Endereco> {
		const enderecoRepo = getCustomRepository(EnderecoRepository);

		const endereco = await enderecoRepo.create({
			logradouro,
			uf,
			cep,
			bairro,
			cidade,
			latitude,
			longitude,
			user_uid,
			paciente_id,
		});

		await enderecoRepo.save(endereco);

		return endereco;
	}
}

export default CreateEnderecoService;
