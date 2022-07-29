import { Request, Response } from 'express';
import CreateClientRespiratoryEvalService from '../services/CreateRespiratoryEvalService';
import DeleteRespiratoryEvalService from '../services/DeleteRespiratoryEvalService';
import GetRespiratoryEvalService from '../services/GetRespiratoryEvalService';
import ListRespiratoryEvalService from '../services/ListRespiratoryEvalService';
import UpdateRespiratoryEvalService from '../services/UpdateRespiratoryEvalService';

export default class ClientRespiratoryEvalController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { evaluation, comments, date, client_id } = request.body;
		const { user_code } = request.user;

		const createRespEval = new CreateClientRespiratoryEvalService();
		const newClientRespEval = await createRespEval.execute({
			evaluation,
			comments,
			date,
			client_id,
			user_code,
		});

		return response.json(newClientRespEval);
	}

	public async get(request: Request, response: Response): Promise<Response> {
		const { id, client_id } = request.params;
		const { user_code } = request.user;

		const geEval = new GetRespiratoryEvalService();
		const getClientRespiratoryEEval = await geEval.execute({
			id: parseInt(id),
			client_id: parseInt(client_id),
			user_code,
		});

		return response.json(getClientRespiratoryEEval);
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		const { evaluation, comments, date, client_id } = request.body;
		const { user_code } = request.user;

		const updateHDA = new UpdateRespiratoryEvalService();
		const updateClientHda = await updateHDA.execute({
			id: parseInt(id),
			evaluation,
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

		const deleteEval = new DeleteRespiratoryEvalService();
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

		const getListPEval = new ListRespiratoryEvalService();
		const getListClientPEval = await getListPEval.execute({
			client_id: parseInt(id),
			user_code,
		});

		return response.json(getListClientPEval);
	}
}
