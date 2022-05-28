import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import CreateUserAddressService from '../services/CreateUserAddressService';
import GetUserAddressService from '../services/GetUserAddressService';
import UpdateUserAddressService from '../services/UpdateUserAddressService';

export default class UsersController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { address, number, city, district, state, country } = request.body;
		const { user_code } = request.user;

		const createUserAddress = new CreateUserAddressService();
		const userAddress = await createUserAddress.execute({
			user_code,
			address,
			number,
			city,
			district,
			state,
			country,
		});

		return response.json({ messsage: 'ok' });
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const { address, number, city, district, state, country } = request.body;
		const { user_code } = request.user;

		const updateUserAddress = new UpdateUserAddressService();
		const userAddress = await updateUserAddress.execute({
			user_code,
			address,
			number,
			city,
			district,
			state,
			country,
		});

		return response.json(userAddress);
	}

	public async get(request: Request, response: Response): Promise<Response> {
		const { user_code } = request.user;

		const getUserAddress = new GetUserAddressService();
		const userAddress = await getUserAddress.execute({ user_code });

		return response.json(userAddress);
	}
}
