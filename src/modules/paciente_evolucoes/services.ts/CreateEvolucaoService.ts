import { EvolucaoRepository } from './../typeorm/repositories/EvolucoesRepository';
import { PacienteRepository } from './../../paciente/typeorm/repositories/PacienteRepository';
import { AgendamentoRepository } from './../../paciente_agendamento/typeorm/repositories/AgendamentoRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

interface IEvolucao {
	evolucao: string;
	observacoes: string;
	status: number;
	tipo?: number;
	agendamento_id: number;
	paciente_id: number;
	user_id: string;
	excluido?: boolean;
}

class CreateEvolucaoService {
	public async execute({
		evolucao,
		observacoes,
		status,
		tipo,
		agendamento_id,
		paciente_id,
		user_id,
	}: IEvolucao): Promise<IEvolucao> {
		const evolucaoRepo = getCustomRepository(EvolucaoRepository);
		const pacienteRepo = getCustomRepository(PacienteRepository);
		const agendamentoRepo = getCustomRepository(AgendamentoRepository);

		const pacienteExiste = await pacienteRepo.findOne({
			user_id,
		});

		if (!pacienteExiste) {
			throw new AppError('O Paciente informado não existe!', 404);
		}

		const agendamentoExiste = await agendamentoRepo.findByIdUser({
			id: agendamento_id,
			user_id,
		});
		if (!agendamentoExiste) {
			throw new AppError('O agendamento informado não existe!', 404);
		}

		const evolucaoCriado = await evolucaoRepo.create({
			evolucao,
			observacoes,
			status,
			tipo,
			agendamento_id,
			paciente_id,
			user_id,
			excluido: false,
		});

		agendamentoExiste.status = status;
		await agendamentoRepo.save(agendamentoExiste);

		await evolucaoRepo.save(evolucaoCriado);

		return evolucaoCriado;
	}
}
export default CreateEvolucaoService;
