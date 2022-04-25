import { horariosDisponiveisV1 } from './../DTO/index';
import { PacienteRepository } from '../../paciente/typeorm/repositories/PacienteRepository';
import { AgendamentoRepository } from '../typeorm/repositories/AgendamentoRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Agendamento from '../typeorm/entities/Agendamento';

interface IAgendamento {
	dataInicio: Date;
	dataFim: Date;
	user_id: string;
}

interface INewAgendamento {
	id: number;
	dataHora: string;
	data: Date;
	hora: number;
	tipo: number;
	status: number;
	paciente_id: number;
}

class ShowAllAppointmentsDayAgendamentoService {
	public async execute({ dataInicio, dataFim, user_id }: IAgendamento): Promise<INewAgendamento[]> {
		const agendamentoRepository = getCustomRepository(AgendamentoRepository);

		const agendamentoExiste = await agendamentoRepository.findByDataRange({
			dataInicio,
			dataFim,
			user_id,
		});

		if (!agendamentoExiste) {
			throw new AppError('Não existe agendamentos para a data selecionada', 404);
		}

		let agendamentos = agendamentoExiste.map(item => ({
			id: item.id,
			dataHora: item.dataHora,
			data: item.data,
			hora: item.hora,
			tipo: item.tipo,
			status: item.status,
			paciente_id: item.paciente_id,
		}));

		return agendamentos;
	}
}
export default ShowAllAppointmentsDayAgendamentoService;
