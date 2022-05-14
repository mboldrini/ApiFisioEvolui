import { getHours, getMinutes, addHours, addMinutes, parseISO } from 'date-fns';
import { UserConfigsRepository } from './../../user_configs/typeorm/repositories/UserConfigsRepository';
import { EvolucaoRepository } from './../../paciente_evolucoes/typeorm/repositories/EvolucoesRepository';
import { PacienteRepository } from '../../paciente/typeorm/repositories/PacienteRepository';
import { AgendamentoRepository } from '../typeorm/repositories/AgendamentoRepository';
import AppError from '@shared/errors/AppError';
import { Double, getCustomRepository } from 'typeorm';
import Agendamento from '../typeorm/entities/Agendamento';

interface IAgendamentoReceive {
	timestamp: number;
	tipo: number;
	status: number;
	paciente_id: number;
	user_id: number;
	excluido: boolean;
}

interface IReturn {
	mensagem: string;
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
	public async execute({ paciente_id, user_id, agendamentos }: IRequest): Promise<IReturn> {
		const agendamentoRepository = getCustomRepository(AgendamentoRepository);
		const pacienteRepository = getCustomRepository(PacienteRepository);
		const evolucaoRepository = getCustomRepository(EvolucaoRepository);
		const userConfigsRepo = getCustomRepository(UserConfigsRepository);

		/// Encontra o Paciente relacionado aos agendamentos a serem criados
		const pacienteExiste = await pacienteRepository.findByIdAndUser({
			id: paciente_id,
			user_id,
		});
		if (!pacienteExiste) {
			throw new AppError('Paciente não encontrado', 404);
		}

		/// Verifica se já existem agendamentos p/ os horarios escolhidos
		const agendamentosExistem = await agendamentoRepository.findAllByIds(agendamentos, user_id);
		if (agendamentosExistem.length > 0) {
			throw new AppError(`Já existe um agendamento p/ a data escolhida - ${agendamentosExistem[0].data}`, 404);
		}

		/// Encontra as configs de usuario atuais, p/ relacionar a esse atendimento em especifico
		const userConfigsExiste = await userConfigsRepo.findOne({ user_id });
		if (!userConfigsExiste) {
			throw new AppError('Não foi encontrado nenhuma config prévia p/ o usuário', 404);
		}

		console.log('??');

		function GetHoraFinalAtendimento(horarioInicio: number, tempoAtendimento: number) {
			let result = new Date(Number(horarioInicio));
			result = addHours(result, getHours(Number(tempoAtendimento)));
			result = addMinutes(result, getMinutes(Number(tempoAtendimento)));
			return result.getTime();
		}

		console.log(`User ID: ${user_id}`);

		const agendamentoSerializado = agendamentos.map(agendamento => ({
			dataTimestamp: agendamento.timestamp,
			data: new Date(agendamento.timestamp),
			hora: Number(
				new Date(agendamento.timestamp).getHours() + '.' + new Date(agendamento.timestamp).getMinutes(),
			),
			tipo: agendamento.tipo,
			status: agendamento.status,
			tempo_atendimento: Number(userConfigsExiste.tempo_atendimento),
			horario_inicioAtendimento: agendamento.timestamp,
			horario_fimAtendimento: GetHoraFinalAtendimento(agendamento.timestamp, userConfigsExiste.tempo_atendimento),
			user_id: user_id,
			paciente_id: pacienteExiste.id,
			excluido: false,
		}));

		await agendamentoRepository.save(agendamentoSerializado);

		const evolucoes = agendamentoSerializado.map(agendamento => ({
			evolucao: '',
			observacoes: '',
			status: agendamento.status,
			tipo: agendamento.tipo,
			agendamento_id: agendamento?.id,
			paciente_id: paciente_id,
			user_id: user_id,
			excluido: false,
		}));

		await evolucaoRepository.save(evolucoes);

		return { mensagem: 'ok' };
	}
}
export default CreateAgendamentoService;
