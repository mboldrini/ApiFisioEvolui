import { TIMEZONE_LANGUAGE } from '@shared/DTO';
import { TIMEZONE_LOCALE } from './../../../../shared/DTO';
import { UsersConfigsRepository } from './../typeorm/repositories/UsersConfigsRepository';
import { UsersRepository } from '@modules/users/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersConfigs from '../typeorm/entities/UsersConfigs';

interface IRequest {
	user_code: string;
}

interface IReturn {
	start_workHour: string;
	end_workHour: string;
	allow_retroactiveDate: boolean;
	allow_notifications: boolean;
	schedule_startDay: boolean;
	user_premium: boolean;
	premium_type: number;
	premium_until: Date;
}

class GetUserConfigsService {
	public async execute({ user_code }: IRequest): Promise<IReturn> {
		const usersRepo = getCustomRepository(UsersRepository);
		const userConfigRepo = getCustomRepository(UsersConfigsRepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError("User don't exist", 404);

		const userConfigsExist = await userConfigRepo.findOne({ user_id: userExists.user_id });
		if (!userConfigsExist) throw new AppError("Don't exist configs registry for this user", 404);

		const userConfigs = {
			start_workHour: userConfigsExist.start_workHour,
			end_workHour: userConfigsExist.end_workHour,
			allow_retroactiveDate: userConfigsExist.allow_retroactiveDate,
			allow_notifications: userConfigsExist.allow_notifications,
			schedule_startDay: userConfigsExist.schedule_startDay,
			user_premium: userConfigsExist.user_premium,
			premium_type: userConfigsExist.premium_type,
			premium_until: userConfigsExist.premium_until,
			created_at: userConfigsExist.created_at.toLocaleString(TIMEZONE_LANGUAGE),
			updated_at: userConfigsExist.updated_at.toLocaleString(TIMEZONE_LANGUAGE),
		};

		return userConfigs;
	}
}
export default GetUserConfigsService;
