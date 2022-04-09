import { Request, Response } from 'express';

export default class PacientePacamentoController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { id_paciente, id_evolucao } = request.body;
		const user_id = request.user.id;
	}
}
