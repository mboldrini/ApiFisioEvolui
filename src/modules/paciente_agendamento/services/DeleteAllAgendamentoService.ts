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
}

interface IRetornoSimplificado {
	id: number;
	excluido: boolean;
}

class DeleteAllAgendamentoService {
	public async execute({ paciente_id, user_id }: IRequest): Promise<IRetornoSimplificado[] | null> {
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

		console.log('PACIENTE EXISTE!');
		console.log(pacienteExiste);

		console.log(`User_id: ${user_id}`);

		const agendamentosExistem = await agendamentoRepository.findAllByIdAndUser({
			id: paciente_id,
			user_id,
		});
		if (agendamentosExistem) {
			const serializedAgendamentos = agendamentosExistem.map(agendamento => ({
				id: agendamento.id,
				excluido: true,
			}));

			await agendamentoRepository.save(serializedAgendamentos);

			return serializedAgendamentos;
		}

		return null;
	}
}
export default DeleteAllAgendamentoService;
