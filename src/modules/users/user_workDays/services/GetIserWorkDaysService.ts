import { UserWorkDaysRepository } from '../typeorm/repositories/UserWorkDaysRepository';
import UsersRepository from '@modules/users/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UserWorkDays from '../typeorm/entities/UserWorkDays';

interface IRequest {
	user_code: string;
}

class GetUserWorkDaysService {
	public async execute({ user_code }: IRequest): Promise<Object> {
		const usersRepo = getCustomRepository(UsersRepository);
		const userWorkDayRepo = getCustomRepository(UserWorkDaysRepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError('Usuário não existe', 404);

		const workdayExist = await userWorkDayRepo.findOne({ user_id: userExists.user_id });
		if (!workdayExist) throw new AppError('Não existe configuração p/ esse usuário');

		const workDayReturn = {
			created_at: workdayExist.created_at,
			updated_at: workdayExist.updated_at,
			sunday: {
				enabled: workdayExist.sunday,
				start: workdayExist.sunday_startHour,
				end: workdayExist.sunday_endHour,
			},
			monday: {
				enabled: workdayExist.monday,
				start: workdayExist.monday_startHour,
				end: workdayExist.monday_endHour,
			},
			tuesday: {
				enabled: workdayExist.tuesday,
				start: workdayExist.tuesday_startHour,
				end: workdayExist.tuesday_endHour,
			},
			wednesday: {
				enabled: workdayExist.wednesday,
				start: workdayExist.wednesday_startHour,
				end: workdayExist.wednesday_endHour,
			},
			thursday: {
				enabled: workdayExist.thursday,
				start: workdayExist.thursday_startHour,
				end: workdayExist.thursday_endHour,
			},
			friday: {
				enabled: workdayExist.friday,
				start: workdayExist.friday_startHour,
				end: workdayExist.friday_endHour,
			},
			saturday: {
				enabled: workdayExist.saturday,
				start: workdayExist.saturday_startHour,
				end: workdayExist.saturday_endHour,
			},
		};

		return workDayReturn;
	}
}
export default GetUserWorkDaysService;
