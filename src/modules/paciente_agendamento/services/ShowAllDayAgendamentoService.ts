import { horariosDisponiveisV1 } from './../DTO/index';
import { PacienteRepository } from '../../paciente/typeorm/repositories/PacienteRepository';
import { AgendamentoRepository } from '../typeorm/repositories/AgendamentoRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Agendamento from '../typeorm/entities/Agendamento';

interface IAgendamento {
	dataInicio: Date;
	dataFim: Date;
	user_id: string;
}

class ShowAllDayAgendamentoService {
	public async execute({ dataInicio, dataFim, user_id }: IAgendamento): Promise<IAgendamento | any> {
		const agendamentoRepository = getCustomRepository(AgendamentoRepository);

		const agendamentoExiste = await agendamentoRepository.findByDataRange({
			dataInicio,
			dataFim,
			user_id,
		});

		if (!agendamentoExiste) {
			throw new AppError('Não existe agendamentos para a data selecionada', 404);
		}

		const agendamentos = agendamentoExiste.map(agendamento => ({
			id: agendamento.id,
			data: agendamento.data,
			hora: agendamento.hora,
		}));

		function horaTaIndisponivel(hora: number, agendamentos: any) {
			const agendamentoFiltrado = agendamentos
				.filter(horario => {
					if (horario.hora == hora) {
						return true;
					}
				})
				.map(valor => {
					return valor.hora;
				});

			if (agendamentoFiltrado[0]) {
				return true;
			} else {
				return false;
			}
		}

		const horariosDisponiveis = horariosDisponiveisV1.map(horario => ({
			id: horario.id,
			hora: horario.hora,
			indisponivel: horaTaIndisponivel(horario.hora, agendamentos),
		}));

		return horariosDisponiveis;
	}
}
export default ShowAllDayAgendamentoService;
