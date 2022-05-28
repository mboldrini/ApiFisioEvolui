import { TIMEZONE_LANGUAGE } from '@shared/DTO';
import { TIMEZONE_LOCALE } from './../../../../shared/DTO';
import { UsersConfigsRepository } from './../typeorm/repositories/UsersConfigsRepository';
import { UsersRepository } from '@modules/users/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersConfigs from '../typeorm/entities/UsersConfigs';

interface IRequest {
	user_code: string;
	start_workHour: string;
	end_workHour: string;
	allow_retroactiveDate: boolean;
	allow_notifications: boolean;
	schedule_startDay: boolean;
	user_premium: boolean;
	premium_type: number;
	premium_until: Date;
}

interface IReturn {
	start_workHour: string;
	end_workHour: string;
	allow_retroactiveDate: boolean;
	allow_notifications: boolean;
	schedule_startDay: boolean;
	user_premium: boolean;
	premium_type: number;
	premium_until: string;
}

class UpdateUserConfigsService {
	public async execute({
		user_code,
		start_workHour,
		end_workHour,
		allow_retroactiveDate,
		allow_notifications,
		schedule_startDay,
		user_premium,
		premium_type,
		premium_until,
	}: IRequest): Promise<IReturn> {
		const usersRepo = getCustomRepository(UsersRepository);
		const userConfigRepo = getCustomRepository(UsersConfigsRepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError("User don't exist", 404);

		const userConfigsExist = await userConfigRepo.findOne({ user_id: userExists.user_id });
		if (!userConfigsExist) throw new AppError("Don't exist configs registry for this user", 404);

		userConfigsExist.start_workHour = start_workHour;
		userConfigsExist.end_workHour = end_workHour;
		userConfigsExist.allow_retroactiveDate = allow_retroactiveDate;
		userConfigsExist.allow_notifications = allow_notifications;
		userConfigsExist.schedule_startDay = schedule_startDay;
		userConfigsExist.user_premium = user_premium;
		userConfigsExist.premium_type = premium_type;
		userConfigsExist.premium_until = premium_until;

		await userConfigRepo.save(userConfigsExist);

		const updatedConfigs = {
			start_workHour: userConfigsExist.start_workHour,
			end_workHour: userConfigsExist.end_workHour,
			allow_retroactiveDate: userConfigsExist.allow_retroactiveDate,
			allow_notifications: userConfigsExist.allow_notifications,
			schedule_startDay: userConfigsExist.schedule_startDay,
			user_premium: userConfigsExist.user_premium,
			premium_type: userConfigsExist.premium_type,
			premium_until: userConfigsExist.premium_until.toLocaleString(TIMEZONE_LANGUAGE),
			created_at: userConfigsExist.created_at.toLocaleString(TIMEZONE_LANGUAGE),
			updated_at: userConfigsExist.updated_at.toLocaleString(TIMEZONE_LANGUAGE),
		};

		return updatedConfigs;
	}
}
export default UpdateUserConfigsService;
