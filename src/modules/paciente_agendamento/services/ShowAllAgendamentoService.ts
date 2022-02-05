import { PacienteRepository } from '../../paciente/typeorm/repositories/PacienteRepository';
import { AgendamentoRepository } from '../typeorm/repositories/AgendamentoRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Agendamento from '../typeorm/entities/Agendamento';

interface IAgendamento {
	dataInicio: Date;
	dataFim: Date;
	paciente_id: number;
	user_id: string;
}

class ShowAllAgendamentoService {
	public async execute({ dataInicio, dataFim, paciente_id, user_id }: IAgendamento): Promise<IAgendamento | any> {
		const agendamentoRepository = getCustomRepository(AgendamentoRepository);

		const agendamentoExiste = await agendamentoRepository.findByDataRangeAndUser({
			dataInicio,
			dataFim,
			paciente_id,
			user_id,
		});

		if (!agendamentoExiste) {
			throw new AppError('Não existe agendamentos para a data selecionada', 404);
		}

		return agendamentoExiste;
	}
}
export default ShowAllAgendamentoService;
