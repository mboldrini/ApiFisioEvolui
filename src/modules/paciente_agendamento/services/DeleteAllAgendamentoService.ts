import { EvolucaoRepository } from './../../paciente_evolucoes/typeorm/repositories/EvolucoesRepository';
import { PacienteRepository } from '../../paciente/typeorm/repositories/PacienteRepository';
import { AgendamentoRepository } from '../typeorm/repositories/AgendamentoRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Agendamento from '../typeorm/entities/Agendamento';
import { id } from 'date-fns/locale';

interface IAgendamento {
	dataHora: string;
	data: Date;
	tipo: number;
	status: number;
}

interface IRequest {
	paciente_id: number;
	user_id: string;
}

interface IRetornoSimplificado {
	id: number;
	excluido: boolean;
}

interface IMensagem {
	mensagem: string;
}

class DeleteAllAgendamentoService {
	public async execute({ paciente_id, user_id }: IRequest): Promise<IMensagem | null> {
		const agendamentoRepository = getCustomRepository(AgendamentoRepository);
		const evolucoesRepository = getCustomRepository(EvolucaoRepository);

		const agendamentosExistem = await agendamentoRepository.findAllByIdAndUser({
			id: paciente_id,
			user_id,
		});

		if (agendamentosExistem) {
			const serializedAgendamentos = agendamentosExistem.map(agendamento => ({
				id: agendamento.id,
				excluido: true,
			}));
			await agendamentoRepository.save(serializedAgendamentos);
		}

		const evolucoesExistem = await evolucoesRepository.findAll({
			paciente_id,
			user_id,
		});

		if (evolucoesExistem) {
			const evolucoesExcluir = evolucoesExistem?.map(evol => ({
				id: evol.id,
				status: evol.status,
				agendamento_id: evol.agendamento_id,
				paciente_id: evol.paciente_id,
				excluido: true,
			}));
			await evolucoesRepository.save(evolucoesExcluir);
		}

		return { mensagem: 'ok' };
	}
}
export default DeleteAllAgendamentoService;
