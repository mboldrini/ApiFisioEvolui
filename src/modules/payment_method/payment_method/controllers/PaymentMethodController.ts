import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import CreatePaymentMethodService from '../services/CreatePaymentMethodService';

export default class PaymentMethodController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { name } = request.body;

		const createPaymentMethod = new CreatePaymentMethodService();
		const paymentMethod = await createPaymentMethod.execute(name);

		return response.json(paymentMethod);
	}

	// public async get(request: Request, response: Response): Promise<Response> {
	// 	const { user_code } = request.user;

	// 	const getUserAddress = new GetUserAddressService();
	// 	const userAddress = await getUserAddress.execute({ user_code });

	// 	return response.json(userAddress);
	// }
}
