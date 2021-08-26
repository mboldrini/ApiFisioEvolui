import { PacienteRepository } from './../../paciente/typeorm/repositories/PacienteRepository';
import { PacienteAgendaRepository } from './../typeorm/repositories/PacienteAgendaRepository';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import PacienteAgenda from '../typeorm/entities/PacienteAgenda';

interface IRequest {
	dia_semana: number;
	data_agendamento: Date;
	horario: number;
	recorrente: boolean;
	limite_recorrencia: boolean;
	data_limite?: Date;
	paciente_id: number;
	user_uid: string;
}

class CreatePacienteAgendaService {
	public async execute({
		dia_semana,
		data_agendamento,
		horario,
		recorrente,
		limite_recorrencia,
		data_limite,
		paciente_id,
		user_uid,
	}: IRequest): Promise<PacienteAgenda> {
		const pacienteAgendaRepository = getCustomRepository(PacienteAgendaRepository);

		const pacienteRepo = getCustomRepository(PacienteRepository);
		const pacienteExists = await pacienteRepo.findByUidAndId(user_uid, paciente_id);
		if (!pacienteExists) {
			throw new AppError('Não existe paciente cadastrado p/ o ID informado');
		}

		const paciente = pacienteAgendaRepository.create({
			dia_semana,
			data_agendamento,
			horario,
			recorrente,
			limite_recorrencia,
			data_limite,
			paciente_id,
			user_uid,
		});

		await pacienteAgendaRepository.save(paciente);

		return paciente;
	}
}
export default CreatePacienteAgendaService;
