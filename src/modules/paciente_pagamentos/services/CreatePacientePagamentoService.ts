import { EvolucaoRepository } from './../../paciente_evolucoes/typeorm/repositories/EvolucoesRepository';
import { PacientePagamentosRepository } from './../typeorm/repositories/PacientePagamentosRepository';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

interface IRequest {
	id_evolucao: number;
	id_paciente: number;
	id_user: string;
	valor: number;
}

class CreatePacienteAgendamentoService {
	public async execute({ id_evolucao, id_paciente, id_user, valor }: IRequest): Promise<boolean> {
		const pacientePagamentoRepository = getCustomRepository(PacientePagamentosRepository);
		const evolucaoRepository = getCustomRepository(EvolucaoRepository);

		const evolucaoExiste = await evolucaoRepository.findOne({
			id: id_evolucao,
			user_id: id_user,
			excluido: false,
		});
		if (!evolucaoExiste) {
			throw new AppError('Evolução não encontrada', 404);
		}

		await pacientePagamentoRepository.save({
			id_evolucao,
			id_paciente,
			id_user,
			valor,
			excluido: false,
		});

		return true;
	}
}
export default CreatePacienteAgendamentoService;
