import { PacienteRepository } from '../../paciente/typeorm/repositories/PacienteRepository';
import { AgendamentoRepository } from '../typeorm/repositories/AgendamentoRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Agendamento from '../typeorm/entities/Agendamento';

interface IAgendamento {
	id: number;
	user_id: string;
}

class ShowAgendamentoService {
	public async execute({ id, user_id }: IAgendamento): Promise<IAgendamento> {
		const agendamentoRepository = getCustomRepository(AgendamentoRepository);

		const agendamentoExiste = await agendamentoRepository.findByIdUser({
			id,
			user_id,
		});
		if (!agendamentoExiste) {
			throw new AppError('Agendamento não encontrado', 404);
		}

		return agendamentoExiste;
	}
}
export default ShowAgendamentoService;
