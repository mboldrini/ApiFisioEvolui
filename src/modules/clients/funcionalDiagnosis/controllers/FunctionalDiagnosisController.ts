import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import CreateFunctionalDiagnosisService from '../services/CreateFunctionalDiagnosisService';
import DeleteFunctionalDiagnosisService from '../services/DeleteDiagnosticService';
import GetFunctionalDiagnosisService from '../services/GetFunctionalDiagnosisService';
import ListFunctionalDiagnosticService from '../services/ListDiagnosticService';
import UpdateFunctionalDiagnosisService from '../services/UpdateFunctionalDiagnosisService';

export default class FunctionalDiagnosisController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { about, comments, date, client_id } = request.body;
		const { user_code } = request.user;

		const createDiagnostic = new CreateFunctionalDiagnosisService();
		const clientDiagnostic = await createDiagnostic.execute({
			diagnostic: about,
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

		const getDiagnostic = new GetFunctionalDiagnosisService();
		const getClientDiagnostic = await getDiagnostic.execute({
			id: parseInt(id),
			client_id: parseInt(client_id),
			user_code,
		});

		return response.json(getClientDiagnostic);
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		const { about, comments, date, client_id } = request.body;
		const { user_code } = request.user;

		const updateDiagnostic = new UpdateFunctionalDiagnosisService();
		const updateClientDiagnostic = await updateDiagnostic.execute({
			id: parseInt(id),
			diagnostic: about,
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

		const deleteDiagnostic = new DeleteFunctionalDiagnosisService();
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

		const getListDiagnostic = new ListFunctionalDiagnosticService();
		const getListClientDiagnostic = await getListDiagnostic.execute({
			client_id: parseInt(id),
			user_code,
		});

		return response.json(getListClientDiagnostic);
	}
}
