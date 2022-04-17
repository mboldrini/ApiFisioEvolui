import { TipoAtendimentoRepository } from '../typeorm/repositories/TipoAtendimentoRepository';
import { Request, Response } from 'express';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import TipoAtendimentoEntity from '../typeorm/entities/TipoAtendimento';

interface IRequest {
	user_id: string;
}

class ShowAllTipoAtendimentoService {
	public async execute({ user_id }: IRequest): Promise<TipoAtendimentoEntity[]> {
		const tipoAtendimentoRepository = getCustomRepository(TipoAtendimentoRepository);

		const tipoAtendimento = await tipoAtendimentoRepository.findAll({
			user_id,
		});

		if (!tipoAtendimento) {
			throw new AppError('Nenhum tipo de atendimento encontrado para esse usuário');
		}

		return tipoAtendimento;
	}
}

export default ShowAllTipoAtendimentoService;
