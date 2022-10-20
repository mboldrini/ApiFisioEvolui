import AppError from '@shared/errors/AppError';
import { MAGIC_CODE } from '../DTO/magicCode';
import { json, Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import ShowUserService from '../services/ShowUserService';
import CreateUserAddressService from '@modules/users/users_address/services/CreateUserAddressService';
import CreateUsersInfosService from '@modules/users/users_infos/services/CreateUserInfosService';
import CreateUserConfigsService from '@modules/users/users_configs/services/CreateUserConfigsService';
import CreateUserWorkDaysService from '@modules/users/user_workDays/services/CreateUserWorkDaysService';
import UserAlreadyExistService from '../services/UserAlreadyExistService';

export default class UsersController {
	public async show(request: Request, response: Response): Promise<Response> {
		const { user_code } = request.user;

		const showUser = new ShowUserService();
		const user = await showUser.execute({ user_code });

		return response.json(user);
	}

	public async exist(request: Request, response: Response): Promise<Response> {
		const { magic_code, email } = request.body;
		const { user_code } = request.user;

		const showUser = new UserAlreadyExistService();
		const user = await showUser.execute({ user_code, email, magic_code });

		return response.json(user);
	}

	public async create(request: Request, response: Response): Promise<Response> {
		const { magic_code, user_code, name, family_name, given_name, picture, email, address, infos } = request.body;

		if (magic_code != MAGIC_CODE) throw new AppError('You Shall not pass!', 404);

		const createUser = new CreateUserService();
		const user = await createUser.execute({
			user_code,
			name,
			family_name,
			given_name,
			picture,
			email,
		});

		const createUserConfigs = new CreateUserConfigsService();
		const userConfigs = await createUserConfigs.execute({
			user_code: user_code,
		});

		if (address) {
			const createUserAddress = new CreateUserAddressService();
			const addRess = await createUserAddress.execute({
				user_code: user_code,
				address: address.address,
				number: address.number,
				city: address.city,
				district: address.district,
				state: address.state,
				country: address.country,
			});
		}

		if (infos) {
			const createUserInfos = new CreateUsersInfosService();
			const addInfos = await createUserInfos.execute({
				user_code: user_code,
				description: infos.description,
				professional_mail: infos.professional_mail,
				celphone: infos.celphone,
				second_celphone: infos.second_celphone,
				website: infos.website,
				instagram: infos.instagram,
				twitter: infos.twitter,
				tiktok: infos.tiktok,
			});
		}

		const createUserWorkDays = new CreateUserWorkDaysService();
		const userWorkDays = await createUserWorkDays.execute({
			user_code,
		});

		return response.json(user);
	}
}
