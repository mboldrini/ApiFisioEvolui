import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import { MAGIC_CODE } from '../DTO/magicCode';
import CreateSessionsService from '../services/CreateSessionsService';

export default class SessionsController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { magic_code, email, user_code } = request.body;

		if (magic_code != MAGIC_CODE) throw new AppError('You Shall not pass!', 404);

		const createSession = new CreateSessionsService();

		const user = await createSession.execute({
			email,
			user_code,
			magic_code,
		});

		return response.json(user);
	}
}
