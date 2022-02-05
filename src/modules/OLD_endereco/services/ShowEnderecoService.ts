import { EnderecoRepository } from '../typeorm/repositories/EnderecoRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Endereco from '../typeorm/entities/Endereco';

interface IRequest {
	uid: string;
	paciente_id: number;
}

class ShowEnderecoService {
	public async findByUidAndIdPaciente({ uid, paciente_id }: IRequest): Promise<Endereco> {
		const enderecoRepo = getCustomRepository(EnderecoRepository);

		const enderecoProcurado = await enderecoRepo.findByUidAndIdPaciente(uid, paciente_id);
		if (!enderecoProcurado) {
			throw new AppError('Não foi encontrado nenhum endereço cadastrado para o usuário');
		}

		return enderecoProcurado;
	}
}

export default ShowEnderecoService;
