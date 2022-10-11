import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import CreateClientHPPService from '../services/CreateHPPService';
import DeleteHPPService from '../services/DeleteHppService';
import GetHPPService from '../services/GetHppService';
import ListHPPService from '../services/ListHPPService';
import UpdateHPPService from '../services/UpdateHPPService';

export default class ClientHppController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { about, comments, date, client_id } = request.body;
		const { user_code } = request.user;

		const createHda = new CreateClientHPPService();
		const newClientHpp = await createHda.execute({
			hpp: about,
			comments,
			date,
			client_id,
			user_code,
		});

		return response.json(newClientHpp);
	}

	public async get(request: Request, response: Response): Promise<Response> {
		const { id, client_id } = request.params;
		const { user_code } = request.user;

		const getHpp = new GetHPPService();
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

		const updateHDA = new UpdateHPPService();
		const updateClientHda = await updateHDA.execute({
			id: parseInt(id),
			hpp: about,
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

		const deleteHPP = new DeleteHPPService();
		const deleteClientHPP = await deleteHPP.execute({
			id: parseInt(id),
			client_id: parseInt(client_id),
			user_code,
		});

		return response.json(deleteClientHPP);
	}

	public async getList(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		const { user_code } = request.user;

		const getListHPP = new ListHPPService();
		const getListClientHPP = await getListHPP.execute({
			client_id: parseInt(id),
			user_code,
		});

		return response.json(getListClientHPP);
	}
}
