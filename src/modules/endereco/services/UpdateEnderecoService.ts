import { EnderecoRepository } from './../typeorm/repositories/EnderecoRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Endereco from '../typeorm/entities/Endereco';

interface IRequest {
	id: number;
	logradouro: string;
	uf: string;
	cep: string;
	bairro: string;
	cidade: string;
	latitude: number;
	longitude: number;
	user_uid: string;
}

class UpdateEnderecoService {
	public async execute({
		id,
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

		const enderecoProcurado = await enderecoRepo.findByUidAndId(user_uid, id);
		if (!enderecoProcurado) {
			throw new AppError('Não foi encontrado nenhum endereço cadastrado para o usuário');
		}

		enderecoProcurado.logradouro = logradouro;
		enderecoProcurado.uf = uf;
		enderecoProcurado.cep = cep;
		enderecoProcurado.bairro = bairro;
		enderecoProcurado.cidade = cidade;
		enderecoProcurado.latitude = latitude;
		enderecoProcurado.longitude = longitude;

		await enderecoRepo.save(enderecoProcurado);

		return enderecoProcurado;
	}
}

export default UpdateEnderecoService;
