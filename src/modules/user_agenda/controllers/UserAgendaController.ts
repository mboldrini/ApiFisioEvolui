import { Request, Response } from 'express';
import CreateUserAgendaService from '../services/CreateUserAgendaService';

export default class UserAgendaController {
	public async create(request: Request, response: Response): Promise<Response> {
		//const { horario_inicio, horario_fim, dia_semana } = request.body;
		const { uid } = request.user;

		const createAgenda = new CreateUserAgendaService();
		const usrAgenda = await createAgenda.execute(request.body, uid);

		return response.json(usrAgenda);
	}
}
