import { TipoAtendimentoRepository } from '../typeorm/repositories/TipoAtendimentoRepository';
import { Request, Response } from 'express';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UserConfigs from '../typeorm/entities/TipoAtendimento';

interface IRequest {
	tipo_id: number;
	user_id: string;
}

class ShowTipoAtendimentoService {
	public async execute({ tipo_id, user_id }: IRequest): Promise<UserConfigs> {
		const tipoAtendimentoRepository = getCustomRepository(TipoAtendimentoRepository);

		const tipoAtendimento = await tipoAtendimentoRepository.findByIdAndUser({
			tipo_id,
			user_id,
		});

		if (!tipoAtendimento) {
			throw new AppError('Tipo de atendimento não encontrado');
		}

		return tipoAtendimento;
	}
}

export default ShowTipoAtendimentoService;
