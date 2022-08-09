import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import CreateClientObjectiveService from '../services/CreateObjectiveService';
import DeleteObjectiveService from '../services/DeleteObjectiveService';
import GetObjectiveService from '../services/GetObjectiveService';
import ListObjectiveService from '../services/ListObjectiveService';
import UpdateObjectiveService from '../services/UpdateObjectiveService';

export default class ClientObjectiveController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { about, comments, date, client_id } = request.body;
		const { user_code } = request.user;

		const createObjective = new CreateClientObjectiveService();
		const newClientObjc = await createObjective.execute({
			objectives: about,
			comments,
			date,
			client_id,
			user_code,
		});

		return response.json(newClientObjc);
	}

	public async get(request: Request, response: Response): Promise<Response> {
		const { id, client_id } = request.params;
		const { user_code } = request.user;

		const getHpp = new GetObjectiveService();
		const getClientHpp = await getHpp.execute({
			id: parseInt(id),
			client_id: parseInt(client_id),
			user_code,
		});

		return response.json(getClientHpp);
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		const { about, comments, date, client_id } = request.body;
		const { user_code } = request.user;

		const updateObjective = new UpdateObjectiveService();
		const updateClientObj = await updateObjective.execute({
			id: parseInt(id),
			objectives: about,
			comments,
			date,
			client_id,
			user_code,
		});

		return response.json(updateClientObj);
	}

	public async delete(request: Request, response: Response): Promise<Response> {
		const { id, client_id } = request.params;
		const { user_code } = request.user;

		const deleteObjective = new DeleteObjectiveService();
		const deleteClientObj = await deleteObjective.execute({
			id: parseInt(id),
			client_id: parseInt(client_id),
			user_code,
		});

		return response.json(deleteClientObj);
	}

	public async getList(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		const { user_code } = request.user;

		const getListObjectives = new ListObjectiveService();
		const getListClientObjectives = await getListObjectives.execute({
			client_id: parseInt(id),
			user_code,
		});

		return response.json(getListClientObjectives);
	}
}
