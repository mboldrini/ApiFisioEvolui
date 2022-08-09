import { Request, Response } from 'express';
import CreateClientPhysicalEvalService from '../services/CreatePhysicalEvalService';
import DeletePhysicalEvalService from '../services/DeletePhysicalEvalService';
import GetPhysicalEvalService from '../services/GetPhysicalEvalService';
import ListPhysicalEvalService from '../services/ListPhysicalEvalService';
import UpdatePhysicalEvalService from '../services/UpdatePhysicalEvalService';

export default class ClientPhysicalEvalController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { about, comments, date, client_id } = request.body;
		const { user_code } = request.user;

		const createPEval = new CreateClientPhysicalEvalService();
		const newClientEval = await createPEval.execute({
			evaluation: about,
			comments,
			date,
			client_id,
			user_code,
		});

		return response.json(newClientEval);
	}

	public async get(request: Request, response: Response): Promise<Response> {
		const { id, client_id } = request.params;
		const { user_code } = request.user;

		const geEval = new GetPhysicalEvalService();
		const getClientPhysicalEEval = await geEval.execute({
			id: parseInt(id),
			client_id: parseInt(client_id),
			user_code,
		});

		return response.json(getClientPhysicalEEval);
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		const { about, comments, date, client_id } = request.body;
		const { user_code } = request.user;

		const updateHDA = new UpdatePhysicalEvalService();
		const updateClientHda = await updateHDA.execute({
			id: parseInt(id),
			evaluation: about,
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

		const deleteEval = new DeletePhysicalEvalService();
		const deleteClientEval = await deleteEval.execute({
			id: parseInt(id),
			client_id: parseInt(client_id),
			user_code,
		});

		return response.json(deleteClientEval);
	}

	public async getList(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		const { user_code } = request.user;

		const getListPEval = new ListPhysicalEvalService();
		const getListClientPEval = await getListPEval.execute({
			client_id: parseInt(id),
			user_code,
		});

		return response.json(getListClientPEval);
	}
}
