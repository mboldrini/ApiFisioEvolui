import { EvolucaoRepository } from './../../paciente_evolucoes/typeorm/repositories/EvolucoesRepository';
import { PacienteRepository } from '../../paciente/typeorm/repositories/PacienteRepository';
import { AgendamentoRepository } from '../typeorm/repositories/AgendamentoRepository';
import AppError from '@shared/errors/AppError';
import { Double, getCustomRepository } from 'typeorm';
import Agendamento from '../typeorm/entities/Agendamento';

interface IAgendamentoReceive {
	data: string;
	hora: number;
	tipo: number;
	status: number;
	paciente_id: number;
	user_id: number;
	excluido: boolean;
}

interface IAgendamentoReturn {
	dataHora: string;
	data: Date;
	hora: Double;
	tipo: number;
	status: number;
	paciente_id: number;
	user_id: string;
	excluido: boolean;
}

interface IRequest {
	paciente_id: number;
	user_id: string;
	agendamentos: IAgendamentoReceive[];
}

function GetData(data: string) {
	let dataStr = data.split('-');
	let date = new Date(parseInt(dataStr[0]), parseInt(dataStr[1]) - 1, parseInt(dataStr[2]));
	return date;
}

class CreateAgendamentoService {
	public async execute({ paciente_id, user_id, agendamentos }: IRequest): Promise<IAgendamentoReturn[]> {
		const agendamentoRepository = getCustomRepository(AgendamentoRepository);
		const pacienteRepository = getCustomRepository(PacienteRepository);

		const evolucaoRepository = getCustomRepository(EvolucaoRepository);

		/* Paciente Existe*/
		const pacienteExiste = await pacienteRepository.findByIdAndUser({
			id: paciente_id,
			user_id,
		});
		if (!pacienteExiste) {
			throw new AppError('Paciente não encontrado', 404);
		}

		const agendamentosExistem = await agendamentoRepository.findAllByIds(agendamentos, user_id);
		if (agendamentosExistem.length > 0) {
			throw new AppError(`Já existe um agendamento p/ a data ${agendamentosExistem[0].data}`);
		}

		const serializado = agendamentos.map(agendamento => ({
			dataHora: agendamento.data + 'T' + agendamento.hora,
			data: GetData(agendamento.data),
			hora: agendamento.hora,
			tipo: agendamento.tipo,
			status: agendamento.status,
			paciente_id,
			user_id,
			excluido: false,
		}));

		await agendamentoRepository.save(serializado);

		const evolucoes = serializado.map(agendamento => ({
			evolucao: '',
			observacoes: '',
			status: agendamento.status,
			tipo: agendamento.status,
			agendamento_id: agendamento?.id,
			paciente_id: paciente_id,
			user_id: user_id,
			excluido: false,
		}));

		await evolucaoRepository.save(evolucoes);

		return serializado;
	}
}
export default CreateAgendamentoService;
