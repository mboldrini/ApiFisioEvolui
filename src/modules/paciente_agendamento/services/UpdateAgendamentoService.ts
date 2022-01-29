import { PacienteRepository } from '../../paciente/typeorm/repositories/PacienteRepository';
import { AgendamentoRepository } from '../typeorm/repositories/AgendamentoRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Agendamento from '../typeorm/entities/Agendamento';

interface IAgendamento {
	id: number;
	dataHora: string;
	tipo: number;
	status: number;
	excluido: boolean;
	paciente_id: number;
	user_id: string;
}

class UpdateAgendamentoService {
	public async execute({
		id,
		dataHora,
		tipo,
		status,
		excluido,
		paciente_id,
		user_id,
	}: IAgendamento): Promise<IAgendamento> {
		const agendamentoRepository = getCustomRepository(AgendamentoRepository);

		const pacienteRepo = getCustomRepository(PacienteRepository);
		const pacienteExiste = await pacienteRepo.findByIdAndUser({
			id: paciente_id,
			user_id,
		});
		if (!pacienteExiste) {
			throw new AppError('Paciente não encontrado', 404);
		}

		const agendamentoExiste = await agendamentoRepository.findByIdUser({
			id,
			user_id,
		});
		if (!agendamentoExiste) {
			throw new AppError('Agendamento não encontrado', 404);
		}

		if (agendamentoExiste.dataHora != dataHora) {
			agendamentoExiste.dataHora = dataHora;
		}
		if (agendamentoExiste.tipo != tipo) {
			agendamentoExiste.tipo = tipo;
		}
		if (agendamentoExiste.status != status) {
			agendamentoExiste.status = status;
		}
		if (agendamentoExiste.excluido != excluido) {
			agendamentoExiste.excluido = excluido;
		}

		await agendamentoRepository.save(agendamentoExiste);

		return agendamentoExiste;
	}
}
export default UpdateAgendamentoService;
