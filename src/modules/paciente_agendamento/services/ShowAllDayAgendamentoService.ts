import { UserConfigsRepository } from './../../user_configs/typeorm/repositories/UserConfigsRepository';
import { horariosDisponiveisV1 } from './../DTO/index';
import { PacienteRepository } from '../../paciente/typeorm/repositories/PacienteRepository';
import { AgendamentoRepository } from '../typeorm/repositories/AgendamentoRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Agendamento from '../typeorm/entities/Agendamento';
import { getHours, getMinutes, getTime, addHours, addMinutes } from 'date-fns';

interface IAgendamento {
	dataInicio: Date;
	dataFim: Date;
	user_id: string;
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
		}));

		/// Encontra as configs desse usuario
		const configExiste = await userConfigsRepo.findOne({ user_id });
		if (!configExiste) {
			throw new AppError('Não existe configurações definidas p/ o usuário', 404);
		}

		function FF() {
			const inicioAtendimento = new Date(parseInt(configExiste.hora_inicioAtendimento));
			const fimAtendimento = new Date(parseInt(configExiste.hora_fimAtendimento));
			const tempoAtendimentoHoras = getHours(new Date(parseInt(configExiste.tempo_atendimento)));
			const tempoAtendimentoMinutos = getMinutes(new Date(parseInt(configExiste.tempo_atendimento)));

			console.log(`Tempo atendimento (H): ${tempoAtendimentoHoras}`);
			console.log(`Tempo atendimento (M): ${tempoAtendimentoMinutos}`);

			let horarioAtendimento = inicioAtendimento;

			console.log('Original: ' + horarioAtendimento);

			while (horarioAtendimento < fimAtendimento) {
				horarioAtendimento = addHours(horarioAtendimento, tempoAtendimentoHoras);
				horarioAtendimento = addMinutes(horarioAtendimento, tempoAtendimentoMinutos);
				console.log('HorarioAtend: ' + horarioAtendimento);
			}
		}
		FF();

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
