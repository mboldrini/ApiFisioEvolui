import { PacienteRepository } from './../../paciente/typeorm/repositories/PacienteRepository';
import { AgendamentoRepository } from '../typeorm/repositories/AgendamentoRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import TipoAtendimentoRepository from '@modules/paciente_tipoAtendimento/typeorm/repositories/TipoAtendimentoRepository';

interface IAgendamento {
	dataInicio: Date;
	dataFim: Date;
	user_id: string;
}

interface INewAgendamento {
	id: number;
	dataHora: string;
	data: Date;
	hora: number;
	tipo: number | any;
	status: number;
	paciente_id: number;
	paciente_nome: string | any;
}

class ShowAllAppointmentsDayAgendamentoService {
	public async execute({ dataInicio, dataFim, user_id }: IAgendamento): Promise<INewAgendamento[]> {
		const agendamentoRepository = getCustomRepository(AgendamentoRepository);
		const tipoAtendimentoRepo = getCustomRepository(TipoAtendimentoRepository);
		const pacientesRepo = getCustomRepository(PacienteRepository);

		const agendamentoExiste = await agendamentoRepository.findByDataRange({
			dataInicio,
			dataFim,
			user_id,
		});

		if (!agendamentoExiste) {
			throw new AppError('Não existe agendamentos para a data selecionada', 404);
		}

		const tipoAtendimentos = await tipoAtendimentoRepo.findAll({ user_id });

		const pacientes = await pacientesRepo.findAllPacientes(user_id);

		let agendamentos = agendamentoExiste.map(item => ({
			id: item.id,
			dataHora: item.dataHora,
			data: item.data,
			hora: item.hora,
			tipo: tipoAtendimentos
				?.filter(tipo => {
					if (tipo.id == item.tipo) {
						return tipo.tipo;
					}
				})
				.map(tipo => {
					return tipo.tipo;
				})[0],
			status: item.status,
			paciente_id: item.paciente_id,
			paciente_nome: pacientes
				?.filter(pct => {
					if (pct.id == item.paciente_id) {
						return pct.nome;
					}
				})
				.map(pct => {
					return pct.nome;
				})[0],
		}));

		return agendamentos;
	}
}
export default ShowAllAppointmentsDayAgendamentoService;
