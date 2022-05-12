import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import ShowUserProfileStatisticsService from '../services/ShowUserProfileStatisticsService';
import ShowUserService from '../services/ShowUserService';
import UpdateUserService from '../services/UpdateUserService';

export default class UsersController {
	public async show(request: Request, response: Response): Promise<Response> {
		const { id } = request.user;

		const showUser = new ShowUserService();
		const user = await showUser.execute({ id });

		return response.json(user);
	}

	public async showProfileStatistics(request: Request, response: Response): Promise<Response> {
		const { id } = request.user;

		const showUser = new ShowUserProfileStatisticsService();
		const user = await showUser.execute({ id });

		return response.json(user);
	}

	public async create(request: Request, response: Response): Promise<Response> {
		const { id, email, family_name, given_name, name, picture, crefito, celular } = request.body;

		const createUser = new CreateUserService();
		const user = await createUser.execute({
			id,
			email,
			family_name,
			given_name,
			name,
			picture,
			crefito,
			celular,
		});

		return response.json(user);
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const { celular, crefito } = request.body;
		const { id } = request.user;

		const updateUser = new UpdateUserService();

		const user = await updateUser.execute({
			id,
			celular,
			crefito,
		});

		return response.json(user);
	}
}
