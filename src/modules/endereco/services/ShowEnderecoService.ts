import { EnderecoRepository } from './../typeorm/repositories/EnderecoRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Endereco from '../typeorm/entities/Endereco';

interface IRequest {
	uid: string;
}

class ShowEnderecoService {
	public async execute({ uid }: IRequest): Promise<Endereco> {
		const enderecoRepo = getCustomRepository(EnderecoRepository);

		const enderecoProcurado = await enderecoRepo.findByUid(uid);
		if (!enderecoProcurado) {
			throw new AppError('Não foi encontrado nenhum endereço cadastrado para o usuário');
		}

		return enderecoProcurado;
	}
}

export default ShowEnderecoService;
