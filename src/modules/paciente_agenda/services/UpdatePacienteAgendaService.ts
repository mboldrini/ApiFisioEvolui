import { PacienteAgendaRepository } from './../typeorm/repositories/PacienteAgendaRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
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

class UpdatePacienteAgendaService {
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
		const pacienteAgendaRepo = getCustomRepository(PacienteAgendaRepository);

		const agendaExists = await pacienteAgendaRepo.findByIdDiaSemanaData(
			user_uid,
			paciente_id,
			dia_semana,
			data_agendamento,
		);
		if (!agendaExists) {
			const pctAgenda = await pacienteAgendaRepo.create({
				dia_semana,
				data_agendamento,
				horario,
				recorrente,
				limite_recorrencia,
				data_limite,
				paciente_id,
				user_uid,
			});

			await pacienteAgendaRepo.save(pctAgenda);

			return pctAgenda;
		}

		agendaExists.data_agendamento = data_agendamento;
		agendaExists.horario = horario;
		agendaExists.recorrente = recorrente;
		agendaExists.limite_recorrencia = limite_recorrencia;
		if (data_limite) {
			agendaExists.data_limite = data_limite;
		}
		agendaExists.paciente_id = paciente_id;
		agendaExists.user_uid = user_uid;

		await pacienteAgendaRepo.save(agendaExists);

		return agendaExists;
	}
}

export default UpdatePacienteAgendaService;
