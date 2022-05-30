import CreateClientAddressService from '@modules/clients/clients_address/services/CreateClientAddressService';
import UpdateClientAddressService from '@modules/clients/clients_address/services/UpdateClientAddressService';
import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import CreateClientService from '../services/CreateClientService';
import DeleteClientService from '../services/DeleteClientService';
import GetAllClientsService from '../services/GetAllClientsService';
import GetClientService from '../services/GetClientService.ts';
import UpdateClientService from '../services/UpdateClientService';

export default class ClientsController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { name, document, email, celphone, second_celphone, instagram, address } = request.body;
		const { user_code } = request.user;

		const createClient = new CreateClientService();
		const newClient = await createClient.execute({
			user_code,
			name,
			document,
			email,
			celphone,
			second_celphone,
			instagram,
		});

		const createAddress = new CreateClientAddressService();
		const newAddress = await createAddress.execute({
			client_id: newClient.id,
			user_code: user_code,
			address: address.address,
			number: address.number,
			city: address.city,
			district: address.district,
			state: address.state,
			country: address.country,
			latitude: address.latitude,
			longitude: address.longitude,
		});

		return response.json({ messsage: 'ok' });
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const { name, document, email, celphone, second_celphone, instagram, address } = request.body;
		const { id } = request.params;
		const { user_code } = request.user;

		const client_id = parseInt(id);

		const updateClient = new UpdateClientService();
		const updatedClient = await updateClient.execute({
			id: client_id,
			user_code,
			name,
			document,
			email,
			celphone,
			second_celphone,
			instagram,
		});

		const updateAddressClient = new UpdateClientAddressService();
		const updateAddress = await updateAddressClient.execute({
			client_id: updatedClient.id,
			user_code: user_code,
			address: address.address,
			number: address.number,
			city: address.city,
			district: address.district,
			state: address.state,
			country: address.country,
			latitude: address.latitude,
			longitude: address.longitude,
		});

		return response.json({ messsage: 'ok' });
	}

	public async get(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		const { user_code } = request.user;

		const client_id = parseInt(id);

		const getclient = new GetClientService();
		const client = await getclient.execute({
			id: client_id,
			user_code,
		});

		return response.json(client);
	}

	public async getAll(request: Request, response: Response): Promise<Response> {
		const { user_code } = request.user;

		const getclient = new GetAllClientsService();
		const clientList = await getclient.execute({
			user_code,
		});

		return response.json(clientList);
	}

	public async delete(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		const { user_code } = request.user;

		const client_id = parseInt(id);

		const getclient = new DeleteClientService();
		const client = await getclient.execute({
			id: client_id,
			user_code,
		});

		return response.json({ message: 'ok' });
	}
}
