import CreateEnderecoService from '@modules/endereco/services/CreateEnderecoService';
import CreateUserAgendaService from '@modules/user_horarios/services/CreateUserAgendaService';
import CreateUserConfigsService from '@modules/user_configs/services/CreateUserConfigsService';
import ShowUserConfigsService from '@modules/user_configs/services/ShowUserConfigsService';
import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import ShowUserService from '../services/ShowUserService';
import UpdateUserService from '../services/UpdateUserService';

export default class UsersController {
	// public async show(request: Request, response: Response): Promise<Response> {
	// 	const { uid, email } = request.user;

	// 	const showUser = new ShowUserService();
	// 	const user = await showUser.execute({ uid });

	// 	return response.json(user);
	// }

	public async create(request: Request, response: Response): Promise<Response> {
		const { id, email, family_name, given_name, name, picture, crefito, celular } = request.body;

		const createUser = new CreateUserService();
		const user = await createUser.execute({
			id,
			email,
			family_name,
			given_name,
			name,
			picture,
			crefito,
			celular,
		});

		return response.json(user);
	}

	// public async update(request: Request, response: Response): Promise<Response> {
	// 	const { nome, email, celular, instagram, crefito, dtNascimento, cpfcnpj } = request.body;
	// 	const { uid } = request.user;

	// 	const updateUser = new UpdateUserService();

	// 	const user = await updateUser.execute({
	// 		uid,
	// 		nome,
	// 		celular,
	// 		instagram,
	// 		crefito,
	// 		dtNascimento,
	// 		cpfcnpj,
	// 	});

	// 	return response.json(user);
	// }
}
