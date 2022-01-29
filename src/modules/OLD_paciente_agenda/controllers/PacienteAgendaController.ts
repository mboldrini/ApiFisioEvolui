import UpdateUserAgendaService from '@modules/user_horarios/services/UpdateUserAgendaService';
import { Request, Response } from 'express';
import CreatePacienteAgendaService from '../services/CreatePacienteAgendaService';
import DeletePacienteAgendaService from '../services/DeletePacienteAgendaService';
import UpdatePacienteAgendaService from '../services/UpdatePacienteAgendaService';

export default class PacienteAgendaController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { uid } = request.user;
		const { paciente_id } = request.body;

		const createParams = new CreatePacienteAgendaService();
		const pacienteAgenda = await createParams.execute(request.body, uid, paciente_id);

		return response.json(pacienteAgenda);
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const { dia_semana, data_agendamento, horario, recorrente, limite_recorrencia, data_limite, paciente_id } =
			request.body;
		const { uid } = request.user;

		const createParams = new UpdatePacienteAgendaService();
		const agenda = await createParams.execute({
			dia_semana,
			data_agendamento,
			horario,
			recorrente,
			limite_recorrencia,
			data_limite,
			user_uid: uid,
			paciente_id,
		});

		return response.json(agenda);
	}

	public async delete(request: Request, response: Response): Promise<Response> {
		const { dia_semana, id, paciente_id } = request.body;
		const { uid } = request.user;

		const deleteParams = new DeletePacienteAgendaService();
		const agenda = await deleteParams.execute({
			dia_semana,
			id,
			user_uid: uid,
			paciente_id,
		});

		return response.json({ message: 'ok' });
	}
}
