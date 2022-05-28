import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import CreateServicesTypeService from '../services/CreateServiceTypeService';
import DeleteServicesTypeService from '../services/DeleteServiceTypeService';
import GetAllServicesTypeService from '../services/GetAllServicesTypeServices';
import GetServicesTypeService from '../services/GetServiceTypeServices';
import UpdateServicesTypeService from '../services/UpdateServiceTypeService';

export default class ServicesTypesController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { name, description, duration, price, paymentMethod_id } = request.body;
		const { user_code } = request.user;

		const createServicesTypes = new CreateServicesTypeService();
		const services = await createServicesTypes.execute({
			user_code,
			name,
			description,
			duration,
			price,
			paymentMethod_id,
		});

		return response.json({ messsage: 'ok' });
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const { name, description, duration, price, paymentMethod_id } = request.body;
		const { user_code } = request.user;
		const { id } = request.params;

		const serviceId = parseInt(id);

		const updateServicesTypes = new UpdateServicesTypeService();
		const services = await updateServicesTypes.execute({
			id: serviceId,
			user_code,
			name,
			description,
			duration,
			price,
			paymentMethod_id,
		});

		return response.json({ messsage: 'ok' });
	}

	public async get(request: Request, response: Response): Promise<Response> {
		const { user_code } = request.user;
		const { id } = request.params;

		const serviceId = parseInt(id);

		const updateServicesTypes = new GetServicesTypeService();
		const services = await updateServicesTypes.execute({
			id: serviceId,
			user_code,
		});

		return response.json(services);
	}

	public async getAll(request: Request, response: Response): Promise<Response> {
		const { user_code } = request.user;

		const deleteServicesTypes = new GetAllServicesTypeService();
		const services = await deleteServicesTypes.execute({
			user_code,
		});

		return response.json(services);
	}

	public async delete(request: Request, response: Response): Promise<Response> {
		const { user_code } = request.user;
		const { id } = request.params;

		const serviceId = parseInt(id);

		const deleteServicesTypes = new DeleteServicesTypeService();
		const services = await deleteServicesTypes.execute({
			id: serviceId,
			user_code,
		});

		return response.json({ message: 'ok' });
	}
}
