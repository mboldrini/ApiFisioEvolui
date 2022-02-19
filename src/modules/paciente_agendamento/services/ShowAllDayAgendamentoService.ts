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

class ShowAllDayAgendamentoService {
	public async execute({ dataInicio, dataFim, user_id }: IAgendamento): Promise<IAgendamento | any> {
		const agendamentoRepository = getCustomRepository(AgendamentoRepository);

		const agendamentoExiste = await agendamentoRepository.findByDataRange({
			dataInicio,
			dataFim,
			user_id,
		});

		if (!agendamentoExiste) {
			throw new AppError('Não existe agendamentos para a data selecionada', 404);
		}

		const agendamentos = agendamentoExiste.map(agendamento => ({
			id: agendamento.id,
			dataHora: agendamento.dataHora,
			data: agendamento.data,
		}));

		return agendamentos;
	}
}
export default ShowAllDayAgendamentoService;
