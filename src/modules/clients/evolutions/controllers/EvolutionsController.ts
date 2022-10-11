import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import CreateEvolutionService from '../services/CreateEvolutionService';
import DeleteEvolutionService from '../services/DeleteEvolutionService';
import GetEvolutionService from '../services/GetEvolutionService';
import ListEvolutionsService from '../services/ListEvolutionsService';
import UpdateEvolutionService from '../services/UpdateEvolutionService';

export default class EvolutionsController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { about, comments, date, client_id } = request.body;
		const { user_code } = request.user;

		const createDiagnostic = new CreateEvolutionService();
		const clientDiagnostic = await createDiagnostic.execute({
			about,
			comments,
			date,
			client_id,
			user_code,
		});

		return response.json(clientDiagnostic);
	}

	public async get(request: Request, response: Response): Promise<Response> {
		const { id, client_id } = request.params;
		const { user_code } = request.user;

		const getEvolution = new GetEvolutionService();
		const getClientEvolution = await getEvolution.execute({
			id: parseInt(id),
			client_id: parseInt(client_id),
			user_code,
		});

		return response.json(getClientEvolution);
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		const { about, comments, date, client_id } = request.body;
		const { user_code } = request.user;

		const updateEvolution = new UpdateEvolutionService();
		const updateClientEvolution = await updateEvolution.execute({
			id: parseInt(id),
			about,
			comments,
			date,
			client_id,
			user_code,
		});

		return response.json(updateClientEvolution);
	}

	public async delete(request: Request, response: Response): Promise<Response> {
		const { id, client_id } = request.params;
		const { user_code } = request.user;

		const deleteEvolution = new DeleteEvolutionService();
		const deleteClientEvolution = await deleteEvolution.execute({
			id: parseInt(id),
			client_id: parseInt(client_id),
			user_code,
		});

		return response.json(deleteClientEvolution);
	}

	public async getList(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		const { user_code } = request.user;

		const getListEvolutions = new ListEvolutionsService();
		const getListClientEvolution = await getListEvolutions.execute({
			client_id: parseInt(id),
			user_code,
		});

		return response.json(getListClientEvolution);
	}
}
