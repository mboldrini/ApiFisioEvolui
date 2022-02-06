import { Request, Response } from 'express';
import CreateUserAgendaService from '../services/CreateUserAgendaService';
import ShowUserAgendaService from '../services/ShowUserAgendaService';
import UpdateUserAgendaService from '../services/UpdateUserAgendaService';

export default class UserAgendaController {
	public async show(request: Request, response: Response): Promise<Response> {
		const { uid } = request.user;

		const showUserAgenda = new ShowUserAgendaService();
		const agenda = await showUserAgenda.execute({ uid });

		return response.json(agenda);
	}

	public async create(request: Request, response: Response): Promise<Response> {
		//const { horario_inicio, horario_fim, dia_semana } = request.body;
		const { uid } = request.user;

		const createAgenda = new CreateUserAgendaService();
		const usrAgenda = await createAgenda.execute(request.body, uid);

		return response.json(usrAgenda);
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const { horario_inicio, horario_fim, dia_semana } = request.body;
		const { uid } = request.user;

		const updateUserAgenda = new UpdateUserAgendaService();

		const agenda = await updateUserAgenda.execute({
			uid,
			horario_inicio,
			horario_fim,
			dia_semana,
		});

		return response.json(agenda);
	}
}
