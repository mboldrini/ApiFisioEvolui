import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import CreateUserWorkDaysService from '../services/CreateUserWorkDaysService';
import GetUserWorkDaysService from '../services/GetIserWorkDaysService';
import UpdateUserWorkDaysService from '../services/UpdateUserWorkDaysService';

export default class UserWorkDaysController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { user_code } = request.user;

		const createUserInfos = new CreateUserWorkDaysService();
		const userWorkDay = await createUserInfos.execute({
			user_code,
		});

		return response.json(userWorkDay);
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const { sunday, monday, tuesday, wednesday, thursday, friday, saturday } = request.body;
		const { user_code } = request.user;

		const updateUserInfos = new UpdateUserWorkDaysService();
		const userWorkDay = await updateUserInfos.execute({
			user_code,
			sunday,
			monday,
			tuesday,
			wednesday,
			thursday,
			friday,
			saturday,
		});

		return response.json(userWorkDay);
	}

	public async get(request: Request, response: Response): Promise<Response> {
		const { user_code } = request.user;

		const createUserInfos = new GetUserWorkDaysService();
		const userWorkDay = await createUserInfos.execute({
			user_code,
		});

		return response.json(userWorkDay);
	}
}
