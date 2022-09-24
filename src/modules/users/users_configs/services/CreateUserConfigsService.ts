import { UsersConfigsRepository } from './../typeorm/repositories/UsersConfigsRepository';
import { UsersRepository } from '@modules/users/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersConfigs from '../typeorm/entities/UsersConfigs';

interface IRequest {
	user_code: string;
	start_workHour?: string;
	end_workHour?: string;
	allow_retroactiveDate?: boolean;
	allow_notifications?: boolean;
	schedule_startDay?: boolean;
	user_premium?: boolean;
	premium_type?: number;
	premium_until?: Date;
}

class CreateUserConfigsService {
	public async execute({
		user_code,
		allow_retroactiveDate,
		allow_notifications,
		schedule_startDay,
		user_premium,
		premium_type,
		premium_until,
	}: IRequest): Promise<UsersConfigs> {
		const usersRepo = getCustomRepository(UsersRepository);
		const userConfigRepo = getCustomRepository(UsersConfigsRepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError("User don't exist", 404);

		const userConfigsExist = await userConfigRepo.findOne({ user_id: userExists.user_id });
		if (userConfigsExist) throw new AppError('Already exist a configs registry for this user', 404);

		const userConfigs = userConfigRepo.create({
			allow_retroactiveDate: allow_retroactiveDate ? allow_retroactiveDate : false,
			allow_notifications: allow_notifications ? allow_notifications : false,
			schedule_startDay: schedule_startDay ? schedule_startDay : true,
			user_premium: user_premium ? user_premium : false,
			premium_type: premium_type ? premium_type : 0,
			premium_until: premium_until ? premium_until : '2055-1-1',
			user_id: userExists.user_id,
		});

		await userConfigRepo.save(userConfigs);

		return userConfigs;
	}
}
export default CreateUserConfigsService;
