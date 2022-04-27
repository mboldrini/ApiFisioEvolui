import { EvolucaoRepository } from './../../paciente_evolucoes/typeorm/repositories/EvolucoesRepository';
import { AgendamentoRepository } from '../typeorm/repositories/AgendamentoRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

interface IAgendamento {
	id: number;
	user_id: string;
}

interface IMensagem {
	mensagem: string;
}

class DeleteAgendamentoService {
	public async execute({ id, user_id }: IAgendamento): Promise<IMensagem> {
		const agendamentoRepository = getCustomRepository(AgendamentoRepository);
		const evolucaoRepo = getCustomRepository(EvolucaoRepository);

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

		return { mensagem: 'ok' };
	}
}
export default DeleteAgendamentoService;
