import { PacienteRepository } from './../../paciente/typeorm/repositories/PacienteRepository';
import { AgendaRepository } from './../typeorm/repositories/AgendaRepository';
//import AppError from '@shared/errors/AppError';
import AppError from '../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

interface IAgendamento {
	id: string;
	dataHora: string;
	data: Date;
	tipo: number;
	status: number;
}

interface IRequest {
	dataInicio: Date;
	dataFim: Date;
	user_id: string;
}

function NomePaciente(pacientesProcurados: any, paciente_id: number) {
	let pct = pacientesProcurados
		.filter((pacie: any) => {
			if (pacie.id == paciente_id) {
				return true;
			}
		})
		.map((pacient: any) => {
			return pacient.nome;
		});

	return pct[0];
}

class ShowAgendaDoDiaService {
	public async execute({ dataInicio, dataFim, user_id }: IRequest): Promise<IAgendamento | any> {
		const agendaRepository = getCustomRepository(AgendaRepository);
		const pacienteRepository = getCustomRepository(PacienteRepository);

		const agendamentoExiste = await agendaRepository.findByDataHora({
			dataInicio,
			dataFim,
			user_id,
		});

		if (!agendamentoExiste) {
			throw new AppError('Não existe agendamentos para a data selecionada', 404);
		}

		let listaIdPacientesProcurados = agendamentoExiste
			.map(agendamento => agendamento.paciente_id)
			.filter((v, i, a) => a.indexOf(v) === i);

		const pacientesProcurados = await pacienteRepository.findAllByIds(listaIdPacientesProcurados, user_id);

		const agendamentos = agendamentoExiste.map(agendamento => ({
			id: agendamento.id,
			dataHora: agendamento.dataHora,
			data: agendamento.data,
			tipo: agendamento.tipo,
			status: agendamento.status,
			paciente_id: agendamento.paciente_id,
			nome: NomePaciente(pacientesProcurados, agendamento.paciente_id),
		}));

		//const findPct = pacienteRepository.findByIds({ listaIdPcts });

		return agendamentos;
	}
}
export default ShowAgendaDoDiaService;
