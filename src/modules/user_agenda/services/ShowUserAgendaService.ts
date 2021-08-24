import { UserAgendaRepository } from './../typeorm/repositories/UserAgendaRepository';
import { Request, Response } from 'express';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

interface IRequest {
	uid: string;
}

class ShowUserAgendaService {
	public async execute({ uid }: IRequest): Promise<Object> {
		const userRepository = getCustomRepository(UserAgendaRepository);

		const user = await userRepository.findAllAgendaByUid(uid);

		if (!user) {
			throw new AppError('Agenda do usuario não encontrada');
		}

		return user; // ignora pq aparentemente ta funcionando...
	}
}

export default ShowUserAgendaService;
