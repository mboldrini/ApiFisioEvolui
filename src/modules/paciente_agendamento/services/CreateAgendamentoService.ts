import { PacienteRepository } from '../../paciente/typeorm/repositories/PacienteRepository';
import { AgendamentoRepository } from '../typeorm/repositories/AgendamentoRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Agendamento from '../typeorm/entities/Agendamento';

interface IAgendamento {
	dataHora: string;
	tipo: number;
	status: number;
}

class CreateAgendamentoService {
	public async execute(paciente_id: number, user_id: string, agendamentos: IAgendamento[]): Promise<IAgendamento[]> {
		const novoAgendamentoRepository = getCustomRepository(AgendamentoRepository);

		const pacienteRepo = getCustomRepository(PacienteRepository);
		const pacienteExiste = await pacienteRepo.findByIdAndUser({
			id: paciente_id,
			user_id,
		});
		if (!pacienteExiste) {
			throw new AppError('Paciente não encontrado', 404);
		}

		const listaAgendamentos = agendamentos.map(agendam => ({
			dataHora: agendam.dataHora,
			tipo: agendam.tipo,
			status: agendam.status,
			paciente_id,
			user_id,
			excluido: 0,
		}));
		await novoAgendamentoRepository.create(listaAgendamentos);

		return agendamentos;
	}
}
export default CreateAgendamentoService;
