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
	}: IRequest): Promise<Endereco> {
		const enderecoRepo = getCustomRepository(EnderecoRepository);

		const endereco = enderecoRepo.create({
			logradouro,
			uf,
			cep,
			bairro,
			cidade,
			latitude,
			longitude,
			user_uid,
		});

		await enderecoRepo.save(endereco);

		return endereco;
	}
}

export default CreateEnderecoService;
