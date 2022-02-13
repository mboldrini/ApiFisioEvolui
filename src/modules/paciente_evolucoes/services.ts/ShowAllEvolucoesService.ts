import { EvolucaoRepository } from './../typeorm/repositories/EvolucoesRepository';
import { PacienteRepository } from './../../paciente/typeorm/repositories/PacienteRepository';
import { AgendamentoRepository } from './../../paciente_agendamento/typeorm/repositories/AgendamentoRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

interface Irequest {
	paciente_id: number;
	user_id: string;
}

interface IEvolucao {
	id: number;
	evolucao: string;
	observacoes: string;
	status: number;
	tipo?: number;
	agendamento_id: number;
	paciente_id: number;
	user_id: string;
	excluido?: boolean;
}

class ShowAllEvolucoesService {
	public async execute({ paciente_id, user_id }: Irequest): Promise<IEvolucao[]> {
		const evolucaoRepo = getCustomRepository(EvolucaoRepository);

		const evolucaoExiste = await evolucaoRepo.findAll({
			paciente_id,
			user_id,
		});
		if (!evolucaoExiste) {
			throw new AppError('A evolução procurada não existe', 404);
		}

		return evolucaoExiste;
	}
}
export default ShowAllEvolucoesService;
