import { UsersInfosRepository } from '../typeorm/repositories/UsersInfosRepository';
import { UsersRepository } from '@modules/users/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersInfos from '../typeorm/entities/UsersInfos';

interface IRequest {
	user_code: string;
	description?: string;
	professional_mail?: string;
	celphone?: string;
	second_celphone?: string;
	website?: string;
	instagram?: string;
	twitter?: string;
	tiktok?: string;
}

class CreateUsersInfosService {
	public async execute({
		user_code,
		description,
		professional_mail,
		celphone,
		second_celphone,
		website,
		instagram,
		twitter,
		tiktok,
	}: IRequest): Promise<UsersInfos> {
		const usersRepo = getCustomRepository(UsersRepository);
		const usersInfosRepo = getCustomRepository(UsersInfosRepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError("User don't exist", 404);

		const usersInfosExists = await usersInfosRepo.findOne({ user_id: userExists.user_id });
		if (usersInfosExists) throw new AppError('Already exist a infos registry for this user', 404);

		const userInfos = usersInfosRepo.create({
			description,
			professional_mail,
			celphone,
			second_celphone,
			website,
			instagram,
			twitter,
			tiktok,
			user_id: userExists.user_id,
		});

		await usersInfosRepo.save(userInfos);

		return userInfos;
	}
}
export default CreateUsersInfosService;
