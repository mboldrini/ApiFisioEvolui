import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import CreateGuidelineService from '../services/CreateGuidelineService';
import DeleteGuidelineService from '../services/DeleteGuidelineService';
import GetGuidelineService from '../services/GetGuidelineService';
import ListGuidelineService from '../services/ListGuidelineService';
import UpdateGuidelineService from '../services/UpdateGuidelineService';

export default class GuidelinesController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { about, comments, date, client_id } = request.body;
		const { user_code } = request.user;

		const createGuideline = new CreateGuidelineService();
		const clientGuideline = await createGuideline.execute({
			guideline: about,
			comments,
			date,
			client_id,
			user_code,
		});

		return response.json(clientGuideline);
	}

	public async get(request: Request, response: Response): Promise<Response> {
		const { id, client_id } = request.params;
		const { user_code } = request.user;

		const getGuideline = new GetGuidelineService();
		const getClientGuideline = await getGuideline.execute({
			id: parseInt(id),
			client_id: parseInt(client_id),
			user_code,
		});

		return response.json(getClientGuideline);
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		const { about, comments, date, client_id } = request.body;
		const { user_code } = request.user;

		const updateGuideline = new UpdateGuidelineService();
		const updateClientGuideline = await updateGuideline.execute({
			id: parseInt(id),
			guideline: about,
			comments,
			date,
			client_id,
			user_code,
		});

		return response.json(updateClientGuideline);
	}

	public async delete(request: Request, response: Response): Promise<Response> {
		const { id, client_id } = request.params;
		const { user_code } = request.user;

		const deleteGuideline = new DeleteGuidelineService();
		const deleteClientGuideline = await deleteGuideline.execute({
			id: parseInt(id),
			client_id: parseInt(client_id),
			user_code,
		});

		return response.json(deleteClientGuideline);
	}

	public async getList(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		const { user_code } = request.user;

		const getListGuideline = new ListGuidelineService();
		const getListClientGuideline = await getListGuideline.execute({
			client_id: parseInt(id),
			user_code,
		});

		return response.json(getListClientGuideline);
	}
}
