import { Request, Response } from 'express';
import CreatePacienteAgendaService from '../services/CreatePacienteAgendaService';

export default class PacienteAgendaController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { dia_semana, data_agendamento, horario, recorrente, limite_recorrencia, data_limite, paciente_id } =
			request.body;
		const { uid } = request.user;

		const createParams = new CreatePacienteAgendaService();
		const pacienteAgenda = await createParams.execute({
			dia_semana,
			data_agendamento,
			horario,
			recorrente,
			limite_recorrencia,
			data_limite,
			paciente_id,
			user_uid: uid,
		});

		return response.json(pacienteAgenda);
	}
}
