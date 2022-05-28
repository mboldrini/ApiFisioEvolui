import { UserWorkDaysRepository } from '../typeorm/repositories/UserWorkDaysRepository';
import UsersRepository from '@modules/users/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UserWorkDays from '../typeorm/entities/UserWorkDays';

interface IRequest {
	user_code: string;
}

class CreateUserWorkDaysService {
	public async execute({ user_code }: IRequest): Promise<UserWorkDays> {
		const usersRepo = getCustomRepository(UsersRepository);
		const userWorkDayRepo = getCustomRepository(UserWorkDaysRepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError("User don' exist", 404);

		const workdayExist = await userWorkDayRepo.findOne({ user_id: userExists.user_id });
		if (workdayExist) throw new AppError('Already exist an workday created for this user');

		const userWorkDay = userWorkDayRepo.create({
			user_id: userExists.user_id,
			sunday: false,
			sunday_startHour: '08:00:00.000-03:00',
			sunday_endHour: '08:01:00.000-03:00',

			monday: true,
			monday_startHour: '08:00:00.000-03:00',
			monday_endHour: '18:00:00.000-03:00',

			tuesday: true,
			tuesday_startHour: '08:00:00.000-03:00',
			tuesday_endHour: '18:00:00.000-03:00',

			wednesday: true,
			wednesday_startHour: '08:00:00.000-03:00',
			wednesday_endHour: '18:00:00.000-03:00',

			thursday: true,
			thursday_startHour: '08:00:00.000-03:00',
			thursday_endHour: '18:00:00.000-03:00',

			friday: true,
			friday_startHour: '08:00:00.000-03:00',
			friday_endHour: '18:00:00.000-03:00',

			saturday: false,
			saturday_startHour: '08:00:00.000-03:00',
			saturday_endHour: '12:00:00.000-03:00',
		});

		await userWorkDayRepo.save(userWorkDay);

		return userWorkDay;
	}
}
export default CreateUserWorkDaysService;
