import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import CreateUsersInfosService from '../services/CreateUserInfosService';
import GetUsersInfosService from '../services/GetUserInfosService';
import UpdateUsersInfosService from '../services/UpdateUserInfosService';

export default class UsersInfosController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { description, professional_mail, celphone, second_celphone, website, instagram, twitter, tiktok } =
			request.body;
		const { user_code } = request.user;

		const createUserInfos = new CreateUsersInfosService();
		const userAddress = await createUserInfos.execute({
			user_code,
			description,
			professional_mail,
			celphone,
			second_celphone,
			website,
			instagram,
			twitter,
			tiktok,
		});

		return response.json({ messsage: 'ok' });
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const { description, professional_mail, celphone, second_celphone, website, instagram, twitter, tiktok } =
			request.body;
		const { user_code } = request.user;

		const updateUserInfos = new UpdateUsersInfosService();
		const userInfos = await updateUserInfos.execute({
			user_code,
			description,
			professional_mail,
			celphone,
			second_celphone,
			website,
			instagram,
			twitter,
			tiktok,
		});

		return response.json({ messsage: 'ok' });
	}

	public async get(request: Request, response: Response): Promise<Response> {
		const { user_code } = request.user;

		const getUserInfos = new GetUsersInfosService();
		const userInfos = await getUserInfos.execute({
			user_code,
		});

		return response.json(userInfos);
	}
}
