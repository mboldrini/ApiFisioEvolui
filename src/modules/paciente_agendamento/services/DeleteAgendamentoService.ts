import { EvolucaoRepository } from './../../paciente_evolucoes/typeorm/repositories/EvolucoesRepository';
import { PacienteRepository } from '../../paciente/typeorm/repositories/PacienteRepository';
import { AgendamentoRepository } from '../typeorm/repositories/AgendamentoRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

interface IAgendamento {
	id: number;
	paciente_id: number;
	user_id: string;
}

class DeleteAgendamentoService {
	public async execute({ id, paciente_id, user_id }: IAgendamento): Promise<IAgendamento> {
		const agendamentoRepository = getCustomRepository(AgendamentoRepository);
		const pacienteRepo = getCustomRepository(PacienteRepository);
		const evolucaoRepo = getCustomRepository(EvolucaoRepository);

		const pacienteExiste = await pacienteRepo.findByIdAndUser({
			id: paciente_id,
			user_id,
		});
		if (!pacienteExiste) {
			throw new AppError('Paciente não encontrado', 404);
		}

		const agendamentoExiste = await agendamentoRepository.findByIdUser({
			id,
			user_id,
		});
		if (!agendamentoExiste) {
			throw new AppError('Agendamento não encontrado', 404);
		}

		agendamentoExiste.excluido = true;

		const evolucaoExiste = await evolucaoRepo.findOne({
			agendamento_id: agendamentoExiste.id,
			user_id,
			excluido: false,
		});
		if (evolucaoExiste) {
			evolucaoExiste.excluido = true;
			await evolucaoRepo.save(evolucaoExiste);
		}

		await agendamentoRepository.save(agendamentoExiste);

		return agendamentoExiste;
	}
}
export default DeleteAgendamentoService;
