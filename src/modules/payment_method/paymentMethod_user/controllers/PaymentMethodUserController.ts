import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import CreatePaymentMethodUserService from '../services/CreatePaymentMethodUserService';
import DeletePaymentMethodUserService from '../services/DeletePaymentMethodUserService';
import GetAllPaymentMethodUserService from '../services/GetAllPaymentMethodUserService';
import GetPaymentMethodUserService from '../services/GetPaymentMethodUserService';
import UpdatePaymentMethodUserService from '../services/UpdatePaymentMethodUserService';

export default class PaymentMethodUserController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { name, description } = request.body;
		const { user_code } = request.user;

		const createPaymentMethodUser = new CreatePaymentMethodUserService();
		const paymentMethod = await createPaymentMethodUser.execute({ name, description, user_code });

		return response.json(paymentMethod);
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const { name, description } = request.body;
		const { user_code } = request.user;
		const { id } = request.params;

		const client_id = parseInt(id);

		const updatePaymentMethodUser = new UpdatePaymentMethodUserService();
		const paymentMethod = await updatePaymentMethodUser.execute({ name, description, user_code, id: client_id });

		return response.json(paymentMethod);
	}

	public async delete(request: Request, response: Response): Promise<Response> {
		const { user_code } = request.user;
		const { id } = request.params;

		const paymentId = parseInt(id);

		const deletePaymentMethodUser = new DeletePaymentMethodUserService();
		const paymentMethod = await deletePaymentMethodUser.execute({ id: paymentId, user_code });

		return response.json(paymentMethod);
	}

	public async get(request: Request, response: Response): Promise<Response> {
		const { user_code } = request.user;
		const { id } = request.params;

		const paymentId = parseInt(id);

		const getPaymentMethodUser = new GetPaymentMethodUserService();
		const paymentMethod = await getPaymentMethodUser.execute({ id: paymentId, user_code });

		return response.json(paymentMethod);
	}

	public async getAll(request: Request, response: Response): Promise<Response> {
		const { user_code } = request.user;

		const getPaymentMethodUser = new GetAllPaymentMethodUserService();
		const paymentMethod = await getPaymentMethodUser.execute({ user_code });

		return response.json(paymentMethod);
	}
}
