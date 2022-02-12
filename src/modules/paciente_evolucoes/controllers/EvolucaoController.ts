import { Request, Response } from 'express';
import CreateEvolucaoService from '../services.ts/CreateEvolucaoService';

export default class EvolucaoController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { evolucao, observacoes, status, tipo, agendamento_id, paciente_id } = request.body;
		const user_id = request.user.id;

		const createEvolucao = new CreateEvolucaoService();

		const novoEvolucao = await createEvolucao.execute({
			evolucao,
			observacoes,
			status,
			tipo,
			agendamento_id,
			paciente_id,
			user_id,
		});

		return response.json(novoEvolucao);
	}
}
