import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import ShowUserService from '../services/ShowUserService';
import UpdateUserService from '../services/UpdateUserService';

export default class UsersController {
	public async show(request: Request, response: Response): Promise<Response> {
		const { uid } = request.params;

		const showUser = new ShowUserService();

		const user = await showUser.execute({ uid });

		return response.json(user);
	}

	public async create(request: Request, response: Response): Promise<Response> {
		const { uid, nome, email, celular, instagram, crefito, dtNascimento, cpfcnpj, excluido } = request.body;

		const createUser = new CreateUserService();

		const user = createUser.execute({
			uid,
			nome,
			email,
			celular,
			instagram,
			crefito,
			dtNascimento,
			cpfcnpj,
			excluido,
		});

		return response.json(user);
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const { uid, nome, email, celular, instagram, crefito, dtNascimento, cpfcnpj, excluido } = request.body;

		const updateUser = new UpdateUserService();

		const user = updateUser.execute({
			uid,
			nome,
			celular,
			instagram,
			crefito,
			dtNascimento,
			cpfcnpj,
		});

		return response.json(user);
	}
}
