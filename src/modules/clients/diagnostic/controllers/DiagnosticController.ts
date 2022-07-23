import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import CreateDiagnosticService from '../services/CreateDiagnosticService';
import DeleteDiagnosticService from '../services/DeleteDiagnosticService';
import GetDiagnosticService from '../services/GetDiagnosticService';
import ListDiagnosticService from '../services/ListDiagnosticService';
import UpdateDiagnosticService from '../services/UpdateDiagnosticService';

export default class DiagnosticController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { diagnostic, comments, date, client_id } = request.body;
		const { user_code } = request.user;

		const createDiagnostic = new CreateDiagnosticService();
		const clientDiagnostic = await createDiagnostic.execute({
			diagnostic,
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

		const getDiagnostic = new GetDiagnosticService();
		const getClientDiagnostic = await getDiagnostic.execute({
			id: parseInt(id),
			client_id: parseInt(client_id),
			user_code,
		});

		return response.json(getClientDiagnostic);
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		const { diagnostic, comments, date, client_id } = request.body;
		const { user_code } = request.user;

		const updateDiagnostic = new UpdateDiagnosticService();
		const updateClientDiagnostic = await updateDiagnostic.execute({
			id: parseInt(id),
			diagnostic,
			comments,
			date,
			client_id,
			user_code,
		});

		return response.json(updateClientDiagnostic);
	}

	public async delete(request: Request, response: Response): Promise<Response> {
		const { id, client_id } = request.params;
		const { user_code } = request.user;

		const deleteDiagnostic = new DeleteDiagnosticService();
		const deleteClientDiagnostic = await deleteDiagnostic.execute({
			id: parseInt(id),
			client_id: parseInt(client_id),
			user_code,
		});

		return response.json(deleteClientDiagnostic);
	}

	public async getList(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		const { user_code } = request.user;

		const getListDiagnostic = new ListDiagnosticService();
		const getListClientDiagnostic = await getListDiagnostic.execute({
			client_id: parseInt(id),
			user_code,
		});

		return response.json(getListClientDiagnostic);
	}
}
