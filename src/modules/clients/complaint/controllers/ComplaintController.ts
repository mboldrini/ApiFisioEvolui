import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import CreateComplaintService from '../services/CreateComplaintService';
import DeleteComplaintService from '../services/DeleteDiagnosticService';
import GetComplaintService from '../services/GetComplaintService';
import ListComplaintService from '../services/ListDiagnosticService';
import UpdateComplaintService from '../services/UpdateComplaintService';

export default class ComplaintController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { complaint, comments, date, client_id } = request.body;
		const { user_code } = request.user;

		const complaintDiagnostic = new CreateComplaintService();
		const clientComplaintDiagnostic = await complaintDiagnostic.execute({
			complaint,
			comments,
			date,
			client_id,
			user_code,
		});

		return response.json(clientComplaintDiagnostic);
	}

	public async get(request: Request, response: Response): Promise<Response> {
		const { id, client_id } = request.params;
		const { user_code } = request.user;

		const getComplaint = new GetComplaintService();
		const getClientComplaint = await getComplaint.execute({
			id: parseInt(id),
			client_id: parseInt(client_id),
			user_code,
		});

		return response.json(getClientComplaint);
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		const { complaint, comments, date, client_id } = request.body;
		const { user_code } = request.user;

		const updateComplaint = new UpdateComplaintService();
		const updateClientComplaint = await updateComplaint.execute({
			id: parseInt(id),
			complaint,
			comments,
			date,
			client_id,
			user_code,
		});

		return response.json(updateClientComplaint);
	}

	public async delete(request: Request, response: Response): Promise<Response> {
		const { id, client_id } = request.params;
		const { user_code } = request.user;

		const deleteComplaint = new DeleteComplaintService();
		const deleteClientComplaint = await deleteComplaint.execute({
			id: parseInt(id),
			client_id: parseInt(client_id),
			user_code,
		});

		return response.json(deleteClientComplaint);
	}

	public async getList(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		const { user_code } = request.user;

		const getListComplaint = new ListComplaintService();
		const getListClientComplaint = await getListComplaint.execute({
			client_id: parseInt(id),
			user_code,
		});

		return response.json(getListClientComplaint);
	}
}
