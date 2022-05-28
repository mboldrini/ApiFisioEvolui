import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import CancelServicePaymentService from '../services/CancelServicePaymentService';
import CreateServicePaymentService from '../services/CreateServicePaymentService';
import DeleteServicePaymentService from '../services/DeleteServicePaymentService';
import GetServicePaymentService from '../services/GetServicePaymentService';
import UpdateServicePaymentService from '../services/UpdateServicePaymentService';

export default class ServicePaymentController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { appointment_id, comments, status, scheduled, serviceType_id } = request.body;
		const { user_code } = request.user;

		const servicePayment = new CreateServicePaymentService();
		const appointment = await servicePayment.create({
			user_code,
			appointment_id,
			comments,
			status,
			scheduled,
			serviceType_id,
		});

		return response.json(appointment);
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const { appointment_id, comments, status, scheduled, paymentMethod_id } = request.body;
		const { user_code } = request.user;
		const { id } = request.params;

		const payment_id = parseInt(id);

		const servicePayment = new UpdateServicePaymentService();
		const appointment = await servicePayment.update({
			id: payment_id,
			user_code,
			appointment_id,
			comments,
			status,
			scheduled,
			paymentMethod_id,
		});

		return response.json(appointment);
	}

	public async get(request: Request, response: Response): Promise<Response> {
		const { user_code } = request.user;
		const { id } = request.params;

		const payment_id = parseInt(id);

		const servicePayment = new GetServicePaymentService();
		const appointment = await servicePayment.get({
			id: payment_id,
			user_code,
		});

		return response.json(appointment);
	}

	public async delete(request: Request, response: Response): Promise<Response> {
		const { user_code } = request.user;
		const { id } = request.params;

		const payment_id = parseInt(id);

		const servicePayment = new DeleteServicePaymentService();
		const appointment = await servicePayment.delete({
			id: payment_id,
			user_code,
		});

		return response.json(appointment);
	}

	public async cancel(request: Request, response: Response): Promise<Response> {
		const { scheduled } = request.body;
		const { user_code } = request.user;
		const { id } = request.params;

		const payment_id = parseInt(id);

		const servicePayment = new CancelServicePaymentService();
		const appointment = await servicePayment.cancel({
			id: payment_id,
			user_code,
			scheduled,
		});

		return response.json(appointment);
	}
}
