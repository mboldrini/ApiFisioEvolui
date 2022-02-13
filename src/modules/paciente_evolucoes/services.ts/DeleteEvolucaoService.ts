import { EvolucaoRepository } from './../typeorm/repositories/EvolucoesRepository';
import { PacienteRepository } from './../../paciente/typeorm/repositories/PacienteRepository';
import { AgendamentoRepository } from './../../paciente_agendamento/typeorm/repositories/AgendamentoRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

interface IEvolucao {
	id: number;
	agendamento_id: number;
	paciente_id: number;
	user_id: string;
}

class DeleteEvolucaoService {
	public async execute({ id, agendamento_id, paciente_id, user_id }: IEvolucao): Promise<IEvolucao> {
		const evolucaoRepo = getCustomRepository(EvolucaoRepository);
		const pacienteRepo = getCustomRepository(PacienteRepository);
		const agendamentoRepo = getCustomRepository(AgendamentoRepository);

		const pacienteExiste = await pacienteRepo.findOne({ user_id });
		if (!pacienteExiste) {
			throw new AppError('O Paciente informado não existe!', 404);
		}

		const agendamentoExiste = await agendamentoRepo.findByIdUser({ id: agendamento_id, user_id });
		if (!agendamentoExiste) {
			throw new AppError('O agendamento informado não existe!', 404);
		}

		const evolucaoExiste = await evolucaoRepo.findOne({
			id,
			paciente_id,
			user_id,
			agendamento_id,
			excluido: false,
		});
		if (!evolucaoExiste) {
			throw new AppError('A evolução selecionada não existe', 404);
		}

		evolucaoExiste.excluido = true;

		await evolucaoRepo.save(evolucaoExiste);

		return evolucaoExiste;
	}
}
export default DeleteEvolucaoService;
