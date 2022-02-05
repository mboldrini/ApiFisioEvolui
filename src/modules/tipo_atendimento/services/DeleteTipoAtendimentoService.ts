import { TipoAtendimentoRepository } from './../typeorm/repositories/TipoAtendimentoRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import TipoAtendimento from '../typeorm/entities/TipoAtendimento';

interface IRequest {
	id: string;
	user_id: string;
}

class DeleteTipoAtendimentoService {
	public async execute({ id, user_id }: IRequest): Promise<TipoAtendimento> {
		const tipoAtendimentoRepository = getCustomRepository(TipoAtendimentoRepository);

		const number_id = Number(id);

		const tipoAtendimento = await tipoAtendimentoRepository.findByIdAndUser({
			tipo_id: number_id,
			user_id,
		});

		if (!tipoAtendimento) {
			throw new AppError('Tipo de atendimento não encontrado');
		}

		tipoAtendimento.excluido = true;

		await tipoAtendimentoRepository.save(tipoAtendimento);

		return tipoAtendimento;
	}
}

export default DeleteTipoAtendimentoService;
