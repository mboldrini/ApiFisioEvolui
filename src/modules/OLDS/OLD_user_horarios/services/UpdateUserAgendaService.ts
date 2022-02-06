import AppError from '@shared/errors/AppError';
import { response } from 'express';
import { getCustomRepository } from 'typeorm';
import UserAgenda from '../typeorm/entities/UserAgenda';
import { UserAgendaRepository } from '../typeorm/repositories/UserAgendaRepository';

interface IRequest {
	horario_inicio: number;
	horario_fim: number;
	dia_semana: number;
	uid: string;
}

class UpdateUserAgendaService {
	public async execute({ horario_inicio, horario_fim, dia_semana, uid }: IRequest): Promise<UserAgenda | void> {
		const userAgendaRepo = getCustomRepository(UserAgendaRepository);

		const diasAgenda = await userAgendaRepo.findAgendaByUidAndDay(uid, dia_semana);
		if (!diasAgenda) {
			throw new AppError('Dia não encontrado na agenda do usuario');
		}

		diasAgenda.horario_inicio = horario_inicio;
		diasAgenda.horario_fim = horario_fim;
		diasAgenda.dia_semana = dia_semana;
		await userAgendaRepo.save(diasAgenda);

		return diasAgenda;
	}
}

export default UpdateUserAgendaService;
