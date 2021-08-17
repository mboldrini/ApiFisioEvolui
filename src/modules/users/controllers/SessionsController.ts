import { Request, Response } from 'express';
import CreateSessionsService from '../services/CreateSessionsService';

export default class SessionsController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { email, uid } = request.body;

		const createSession = new CreateSessionsService();

		const user = await createSession.execute({
			email,
			uid,
		});

		return response.json(user);
	}
}
