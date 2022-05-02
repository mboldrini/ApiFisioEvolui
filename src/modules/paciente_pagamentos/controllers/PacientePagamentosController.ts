import { Request, Response } from 'express';
import CreatePacientePagamentoService from '../services/CreatePacientePagamentoService';

export default class PacientePagamentoController {
	public async create(request: Request, response: Response): Promise<Response | boolean> {
		const { id_paciente, id_evolucao } = request.body;
		const user_id = request.user.id;

		const createPagamento = new CreatePacientePagamentoService();

		return true;

		const novoPagamento = await createPagamento.execute({
			id_paciente,
			id_evolucao,
			id_user: user_id,
		});

		return response.json(novoPagamento);
	}
}
