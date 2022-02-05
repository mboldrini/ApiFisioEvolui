import { PacienteRepository } from '../../paciente/typeorm/repositories/PacienteRepository';
import { AgendamentoRepository } from '../typeorm/repositories/AgendamentoRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Agendamento from '../typeorm/entities/Agendamento';

interface IAgendamento {
	dataHora: string;
	data: Date;
	tipo: number;
	status: number;
}

interface IRequest {
	paciente_id: number;
	user_id: string;
	agendamentos: IAgendamento[];
}

class CreateAgendamentoService {
	public async execute({ paciente_id, user_id, agendamentos }: IRequest): Promise<IAgendamento[]> {
		const agendamentoRepository = getCustomRepository(AgendamentoRepository);
		const pacienteRepository = getCustomRepository(PacienteRepository);

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
			throw new AppError(`Já existe um agendamento p/ a data ${agendamentosExistem[0].dataHora}`);
		}

		const serializedAgendamentos = agendamentos.map(agendamento => ({
			dataHora: agendamento.dataHora,
			tipo: agendamento.tipo,
			status: agendamento.status,
			data: agendamento.data,
			paciente_id,
			user_id,
			excluido: false,
		}));

		await agendamentoRepository.save(serializedAgendamentos);

		return serializedAgendamentos;
	}
}
export default CreateAgendamentoService;
