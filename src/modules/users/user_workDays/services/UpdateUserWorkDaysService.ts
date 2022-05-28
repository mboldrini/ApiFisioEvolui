import { UserWorkDaysRepository } from '../typeorm/repositories/UserWorkDaysRepository';
import UsersRepository from '@modules/users/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UserWorkDays from '../typeorm/entities/UserWorkDays';
import UsersConfigsRepository from '@modules/users/users_configs/typeorm/repositories/UsersConfigsRepository';

interface IRequest {
	user_code: string;

	sunday: boolean;
	sunday_startHour: string;
	sunday_endHour: string;

	monday: boolean;
	monday_startHour: string;
	monday_endHour: string;

	tuesday: boolean;
	tuesday_startHour: string;
	tuesday_endHour: string;

	wednesday: boolean;
	wednesday_startHour: string;
	wednesday_endHour: string;

	thursday: boolean;
	thursday_startHour: string;
	thursday_endHour: string;

	friday: boolean;
	friday_startHour: string;
	friday_endHour: string;

	saturday: boolean;
	saturday_startHour: string;
	saturday_endHour: string;
}

class UpdateUserWorkDaysService {
	public async execute({
		user_code,
		sunday,
		sunday_startHour,
		sunday_endHour,
		monday,
		monday_startHour,
		monday_endHour,
		tuesday,
		tuesday_startHour,
		tuesday_endHour,
		wednesday,
		wednesday_startHour,
		wednesday_endHour,
		thursday,
		thursday_startHour,
		thursday_endHour,
		friday,
		friday_startHour,
		friday_endHour,
		saturday,
		saturday_startHour,
		saturday_endHour,
	}: IRequest): Promise<UserWorkDays> {
		const usersRepo = getCustomRepository(UsersRepository);
		const userConfigRepo = getCustomRepository(UsersConfigsRepository);
		const userWorkDayRepo = getCustomRepository(UserWorkDaysRepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError("User don't exist", 404);

		const userConfigExists = await userConfigRepo.findOne({ user_id: userExists.user_id });
		if (!userConfigExists) throw new AppError("User configs don't exist", 404);

		const workdayExist = await userWorkDayRepo.findOne({ user_id: userExists.user_id });
		if (!workdayExist) throw new AppError('Already exist an workday created for this user');

		if (!userConfigExists.user_premium)
			throw new AppError("Only premium user's can change the work days/hours", 404);

		workdayExist.sunday = sunday;
		workdayExist.sunday_startHour = sunday_startHour;
		workdayExist.sunday_endHour = sunday_endHour;
		workdayExist.monday = monday;
		workdayExist.monday_startHour = monday_startHour;
		workdayExist.monday_endHour = monday_endHour;
		workdayExist.tuesday = tuesday;
		workdayExist.tuesday_startHour = tuesday_startHour;
		workdayExist.tuesday_endHour = tuesday_endHour;
		workdayExist.wednesday = wednesday;
		workdayExist.wednesday_startHour = wednesday_startHour;
		workdayExist.wednesday_endHour = wednesday_endHour;
		workdayExist.thursday = thursday;
		workdayExist.thursday_startHour = thursday_startHour;
		workdayExist.thursday_endHour = thursday_endHour;
		workdayExist.friday = friday;
		workdayExist.friday_startHour = friday_startHour;
		workdayExist.friday_endHour = friday_endHour;
		workdayExist.saturday = saturday;
		workdayExist.saturday_startHour = saturday_startHour;
		workdayExist.saturday_endHour = saturday_endHour;

		const userWorkDay = userWorkDayRepo.save(workdayExist);

		return userWorkDay;
	}
}
export default UpdateUserWorkDaysService;
