import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import CreateUserWorkDaysService from '../services/CreateUserWorkDaysService';
import UpdateUserWorkDaysService from '../services/UpdateUserWorkDaysService';

export default class UserWorkDaysController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { user_code } = request.user;

		const createUserInfos = new CreateUserWorkDaysService();
		const userWorkDay = await createUserInfos.execute({
			user_code,
		});

		return response.json(userWorkDay);
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const {
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
		} = request.body;
		const { user_code } = request.user;

		const updateUserInfos = new UpdateUserWorkDaysService();
		const userWorkDay = await updateUserInfos.execute({
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
		});

		return response.json(userWorkDay);
	}
}
