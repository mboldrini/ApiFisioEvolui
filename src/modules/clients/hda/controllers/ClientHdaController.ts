import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import CreateClientHDAService from '../services/CreateHDAService';
import DeleteHDAService from '../services/DeleteHDAService';
import GetHDAService from '../services/GetHDAService';
import ListHDAService from '../services/ListHDAService';
import UpdateHDAService from '../services/UpdateHDAService';

export default class ClientHdaController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { about, comments, date, client_id } = request.body;
		const { user_code } = request.user;

		const createHda = new CreateClientHDAService();
		const newClientHda = await createHda.execute({
			hda: about,
			comments,
			date,
			client_id,
			user_code,
		});

		return response.json(newClientHda);
	}

	public async get(request: Request, response: Response): Promise<Response> {
		const { id, client_id } = request.params;
		const { user_code } = request.user;

		const getHda = new GetHDAService();
		const getClientHda = await getHda.execute({
			id: parseInt(id),
			client_id: parseInt(client_id),
			user_code,
		});

		return response.json(getClientHda);
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		const { about, comments, date, client_id } = request.body;
		const { user_code } = request.user;

		const updateHDA = new UpdateHDAService();
		const updateClientHda = await updateHDA.execute({
			id: parseInt(id),
			hda: about,
			comments,
			date,
			client_id,
			user_code,
		});

		return response.json(updateClientHda);
	}

	public async delete(request: Request, response: Response): Promise<Response> {
		const { id, client_id } = request.params;
		const { user_code } = request.user;

		const deleteHDA = new DeleteHDAService();
		const deleteClientHDA = await deleteHDA.execute({
			id: parseInt(id),
			client_id: parseInt(client_id),
			user_code,
		});

		return response.json(deleteClientHDA);
	}

	public async getList(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		const { user_code } = request.user;

		const getListHDA = new ListHDAService();
		const getListClientHDA = await getListHDA.execute({
			client_id: parseInt(id),
			user_code,
		});

		return response.json(getListClientHDA);
	}
}
