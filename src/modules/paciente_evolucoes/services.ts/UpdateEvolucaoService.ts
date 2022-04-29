import { EvolucaoRepository } from './../typeorm/repositories/EvolucoesRepository';
import { AgendamentoRepository } from './../../paciente_agendamento/typeorm/repositories/AgendamentoRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

interface IEvolucao {
	id: number;
	evolucao: string;
	observacoes: string;
	status: number;
	tipo: number;
	user_id: string;
}

interface IRetorno {
	mensagem: string;
}

class UpdateEvolucaoService {
	public async execute({ id, evolucao, observacoes, status, tipo, user_id }: IEvolucao): Promise<IRetorno> {
		const evolucaoRepo = getCustomRepository(EvolucaoRepository);
		const agendamentoRepo = getCustomRepository(AgendamentoRepository);

		const evolucaoExiste = await evolucaoRepo.findOne({
			id,
			user_id,
			excluido: false,
		});
		if (!evolucaoExiste) {
			throw new AppError('A evolução selecionada não existe', 404);
		}

		const agendamentoExiste = await agendamentoRepo.findByIdUser({ id: evolucaoExiste.agendamento_id, user_id });
		if (!agendamentoExiste) {
			throw new AppError('O agendamento informado não existe!', 404);
		}

		evolucaoExiste.evolucao = evolucao;
		evolucaoExiste.observacoes = observacoes;
		evolucaoExiste.status = status;
		evolucaoExiste.tipo = tipo;

		agendamentoExiste.status = status;
		agendamentoExiste.tipo = tipo;

		await agendamentoRepo.save(agendamentoExiste);

		await evolucaoRepo.save(evolucaoExiste);

		return { mensagem: 'ok' };
	}
}
export default UpdateEvolucaoService;
