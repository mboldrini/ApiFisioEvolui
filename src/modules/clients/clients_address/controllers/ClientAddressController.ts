import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import CreateClientAddressService from '../services/CreateClientAddressService';
import GetClientAddressService from '../services/GetClientAddressService';
import UpdateClientAddressService from '../services/UpdateClientAddressService';

export default class ClientsAddressController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { address, number, city, district, state, country } = request.body;
		const { user_code } = request.user;

		const createClientAddress = new CreateClientAddressService();
		const clientAddress = await createClientAddress.execute({
			user_code,
			address,
			number,
			city,
			district,
			state,
			country,
			client_id: 1,
		});

		return response.json({ messsage: 'ok' });
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const { address, number, city, district, state, country } = request.body;
		const { user_code } = request.user;
		const { id } = request.params;

		const client_id = parseInt(id);

		const updateUserAddress = new UpdateClientAddressService();
		const clientAddress = await updateUserAddress.execute({
			client_id: client_id,
			user_code,
			address,
			number,
			city,
			district,
			state,
			country,
		});

		return response.json(clientAddress);
	}

	public async get(request: Request, response: Response): Promise<Response> {
		const { user_code } = request.user;
		const { id } = request.params;

		const client_id = parseInt(id);

		const getClientAddress = new GetClientAddressService();
		const clientAddress = await getClientAddress.execute({ user_code, client_id });

		return response.json(clientAddress);
	}
}
