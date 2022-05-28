import { UsersInfosRepository } from '../typeorm/repositories/UsersInfosRepository';
import { UsersRepository } from '@modules/users/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersInfos from '../typeorm/entities/UsersInfos';
import { TIMEZONE_LANGUAGE } from '@shared/DTO';

interface IRequest {
	user_code: string;
}

interface IMapUser {
	description: string;
	professional_mail: string;
	celphone: string;
	second_celphone: string;
	website: string;
	instagram: string;
	twitter: string;
	tiktok: string;
	created_at: string;
	updated_at: string;
}

class GetUsersInfosService {
	public async execute({ user_code }: IRequest): Promise<IMapUser> {
		const usersRepo = getCustomRepository(UsersRepository);
		const usersInfosRepo = getCustomRepository(UsersInfosRepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError("User don't exist", 404);

		const usersInfosExists = await usersInfosRepo.findOne({ user_id: userExists.user_id });
		if (!usersInfosExists) throw new AppError("Don't exist infos registry for this user", 404);

		let mapUser = {
			description: usersInfosExists.description,
			professional_mail: usersInfosExists.professional_mail,
			celphone: usersInfosExists.celphone,
			second_celphone: usersInfosExists.second_celphone,
			website: usersInfosExists.website,
			instagram: usersInfosExists.instagram,
			twitter: usersInfosExists.twitter,
			tiktok: usersInfosExists.tiktok,
			created_at: usersInfosExists.created_at.toLocaleString(TIMEZONE_LANGUAGE),
			updated_at: usersInfosExists.created_at.toLocaleString(TIMEZONE_LANGUAGE),
		};

		return mapUser;
	}
}
export default GetUsersInfosService;
