import { Request, Response } from 'express';
import ShowAgendaDoDiaService from '../services/ShowAgendaDoDia';

export default class AgendaController {
	public async show(request: Request, response: Response): Promise<Response> {
		const { dataInicio, dataFim } = request.body;
		const user_id = request.user.id;

		const showAgendamento = new ShowAgendaDoDiaService();
		const agendamento = await showAgendamento.execute({
			dataInicio,
			dataFim,
			user_id,
		});

		return response.json(agendamento);
	}
}
