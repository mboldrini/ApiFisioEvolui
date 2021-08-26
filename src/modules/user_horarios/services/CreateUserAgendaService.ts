import AppError from '@shared/errors/AppError';
import { response } from 'express';
import { getCustomRepository } from 'typeorm';
import UserAgenda from '../typeorm/entities/UserAgenda';
import { UserAgendaRepository } from '../typeorm/repositories/UserAgendaRepository';

interface IRequest {
	horario_inicio: number;
	horario_fim: number;
	dia_semana: number;
	user_uid: string;
}

class CreateUserAgendaService {
	public async execute(agenda: IRequest[], uid: string): Promise<IRequest[] | void> {
		const userAgendaRepo = getCustomRepository(UserAgendaRepository);

		const listaDias = agenda.map(dia => ({
			horario_inicio: dia.horario_inicio,
			horario_fim: dia.horario_fim,
			dia_semana: dia.dia_semana,
			user_uid: uid,
		}));
		await userAgendaRepo.save(listaDias);

		return agenda;
	}
}

export default CreateUserAgendaService;
