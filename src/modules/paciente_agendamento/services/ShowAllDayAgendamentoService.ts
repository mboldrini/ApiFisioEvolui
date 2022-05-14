import { UserConfigsRepository } from './../../user_configs/typeorm/repositories/UserConfigsRepository';
import { PacienteRepository } from '../../paciente/typeorm/repositories/PacienteRepository';
import { AgendamentoRepository } from '../typeorm/repositories/AgendamentoRepository';
import AppError from '@shared/errors/AppError';
import { ConnectionIsNotSetError, getCustomRepository } from 'typeorm';
import Agendamento from '../typeorm/entities/Agendamento';
import { getHours, getMinutes, getTime, addHours, addMinutes } from 'date-fns';

interface IAgendamento {
	dataInicio: Date;
	dataFim: Date;
	user_id: string;
}

interface IHorariosDisponiveis {
	id: number;
	hora: string;
	indisponivel: boolean;
	timestamp: number;
}

function GetCustomDateHour(data: Date, horario: number) {
	let dt = new Date(data);
	dt = addHours(dt, getHours(parseInt(horario)));
	dt = addMinutes(dt, getMinutes(parseInt(horario)));
	return dt;
}

class ShowAllDayAgendamentoService {
	public async execute({ dataInicio, dataFim, user_id }: IAgendamento): Promise<IAgendamento | any> {
		const agendamentoRepository = getCustomRepository(AgendamentoRepository);
		const userConfigsRepo = getCustomRepository(UserConfigsRepository);

		/// Verifica se tem agendamentos para o range de data escolhido
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
			timestamp: agendamento.dataHora,
		}));

		console.log('Agendamentos:');
		console.log(agendamentos);

		/// Encontra as configs desse usuario
		const configExiste = await userConfigsRepo.findOne({ user_id });
		if (!configExiste) {
			throw new AppError('Não existe configurações definidas p/ o usuário', 404);
		}

		let horariosDisponiveisV2 = [] as IHorariosDisponiveis[];

		function GeraListaHorariosDisponiveis(): void {
			const inicioAtendimento = GetCustomDateHour(dataInicio, configExiste?.hora_inicioAtendimento);
			const fimAtendimento = GetCustomDateHour(dataFim, configExiste?.hora_fimAtendimento);

			let horarioAtendimento = inicioAtendimento;
			let id = 0;

			while (horarioAtendimento <= fimAtendimento) {
				horariosDisponiveisV2.push({
					id: id,
					hora:
						getHours(horarioAtendimento) +
						':' +
						(getMinutes(horarioAtendimento) == 0 ? '00' : getMinutes(horarioAtendimento)),
					indisponivel: false,
					timestamp: horarioAtendimento.getTime(),
				});

				horarioAtendimento = addHours(
					horarioAtendimento,
					getHours(new Date(parseInt(configExiste.tempo_atendimento))),
				);
				horarioAtendimento = addMinutes(
					horarioAtendimento,
					getMinutes(new Date(parseInt(configExiste.tempo_atendimento))),
				);

				if (!configExiste?.ignorar_tempoDeslocamento) {
					horarioAtendimento = addHours(
						horarioAtendimento,
						getHours(new Date(parseInt(configExiste?.tempo_deslocamento))),
					);
					horarioAtendimento = addMinutes(
						horarioAtendimento,
						getMinutes(new Date(parseInt(configExiste?.tempo_deslocamento))),
					);
				}

				id += 1;
			}
		}
		GeraListaHorariosDisponiveis();

		function horaTaIndisponivel(hora: number, agendamentos: any) {
			const agendamentoFiltrado = agendamentos
				.filter(horario => {
					if (horario.timestamp == hora) {
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

		const horariosDisponiveis = horariosDisponiveisV2.map(horarioDisp => ({
			id: horarioDisp.id,
			hora: horarioDisp.hora,
			indisponivel: horaTaIndisponivel(horarioDisp.timestamp, agendamentos),
			timestamp: horarioDisp.timestamp,
		}));

		return horariosDisponiveis;
	}
}
export default ShowAllDayAgendamentoService;
