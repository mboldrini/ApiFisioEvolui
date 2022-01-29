// import { PacienteRepository } from './../../paciente/typeorm/repositories/PacienteRepository';
import { PacienteAgendaRepository } from '../typeorm/repositories/PacienteAgendaRepository';
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
}

class CreatePacienteAgendaService {
	public async execute(pacienteAgenda: IRequest[], uid: string, paciente_id: number): Promise<IRequest[]> {
		const pacienteAgendaRepository = getCustomRepository(PacienteAgendaRepository);

		const listaPacienteAgenda = pacienteAgenda.map(dia => ({
			dia_semana: dia.dia_semana,
			data_agendamento: dia.data_agendamento,
			horario: dia.horario,
			recorrente: dia.recorrente,
			limite_recorrencia: dia.limite_recorrencia,
			data_limite: dia.data_limite,
			paciente_id,
			user_uid: uid,
		}));
		await pacienteAgendaRepository.save(listaPacienteAgenda);

		return listaPacienteAgenda;
	}
}
export default CreatePacienteAgendaService;
