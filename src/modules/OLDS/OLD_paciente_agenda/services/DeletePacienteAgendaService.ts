import { PacienteAgendaRepository } from '../typeorm/repositories/PacienteAgendaRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import PacienteAgenda from '../typeorm/entities/PacienteAgenda';

interface IRequest {
	dia_semana: number;
	id: number;
	paciente_id: number;
	user_uid: string;
}

class DeletePacienteAgendaService {
	public async execute({ dia_semana, id, paciente_id, user_uid }: IRequest): Promise<void> {
		const pacienteAgendaRepo = getCustomRepository(PacienteAgendaRepository);

		const agendaExists = await pacienteAgendaRepo.findById(user_uid, id);

		if (agendaExists) {
			await pacienteAgendaRepo.remove(agendaExists);
		}

		return;
	}
}

export default DeletePacienteAgendaService;
