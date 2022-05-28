import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import CreateUserConfigsService from '../services/CreateUserConfigsService';
import GetUserConfigsService from '../services/GetUserConfigsService';
import UpdateUserConfigsService from '../services/UpdateUserConfigsService';

export default class UserConfigsController {
	public async create(request: Request, response: Response): Promise<Response> {
		const {
			start_workHour,
			end_workHour,
			allow_retroactiveDate,
			allow_notifications,
			schedule_startDay,
			user_premium,
			premium_type,
			premium_until,
		} = request.body;
		const { user_code } = request.user;

		const createUserConfigs = new CreateUserConfigsService();
		const userConfigs = await createUserConfigs.execute({
			user_code,
			start_workHour,
			end_workHour,
			allow_retroactiveDate,
			allow_notifications,
			schedule_startDay,
			user_premium,
			premium_type,
			premium_until,
		});

		return response.json({ message: 'ok' });
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const {
			start_workHour,
			end_workHour,
			allow_retroactiveDate,
			allow_notifications,
			schedule_startDay,
			user_premium,
			premium_type,
			premium_until,
		} = request.body;
		const { user_code } = request.user;

		const updateUserConfigs = new UpdateUserConfigsService();
		const updateConfigs = await updateUserConfigs.execute({
			user_code,
			start_workHour,
			end_workHour,
			allow_retroactiveDate,
			allow_notifications,
			schedule_startDay,
			user_premium,
			premium_type,
			premium_until,
		});

		return response.json(updateConfigs);
	}

	public async get(request: Request, response: Response): Promise<Response> {
		const { user_code } = request.user;

		const userConfigs = new GetUserConfigsService();
		const configs = await userConfigs.execute({
			user_code,
		});

		return response.json(configs);
	}
}
