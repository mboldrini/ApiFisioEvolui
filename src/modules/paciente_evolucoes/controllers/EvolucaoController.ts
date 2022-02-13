import { Request, Response } from 'express';
import CreateEvolucaoService from '../services.ts/CreateEvolucaoService';
import ShowEvolucaoService from '../services.ts/ShowEvolucaoService';
import UpdateEvolucaoService from '../services.ts/UpdateEvolucaoService';

export default class EvolucaoController {
	public async update(request: Request, response: Response): Promise<Response> {
		const { id, evolucao, observacoes, status, tipo, agendamento_id, paciente_id } = request.body;
		const user_id = request.user.id;

		const updateEvolucao = new UpdateEvolucaoService();

		const updateEvo = await updateEvolucao.execute({
			id,
			evolucao,
			observacoes,
			status,
			tipo,
			agendamento_id,
			paciente_id,
			user_id,
		});

		return response.json(updateEvo);
	}

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

	public async show(request: Request, response: Response): Promise<Response> {
		const { agendamento_id, paciente_id } = request.body;
		const user_id = request.user.id;

		const showEvolucao = new ShowEvolucaoService();

		const evolucao = await showEvolucao.execute({
			agendamento_id,
			paciente_id,
			user_id,
		});

		return response.json(evolucao);
	}
}
