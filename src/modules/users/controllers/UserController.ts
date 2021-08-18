import CreateUserConfigsService from '@modules/params/services/CreateUserConfigsService';
import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import ShowUserService from '../services/ShowUserService';
import UpdateUserService from '../services/UpdateUserService';

export default class UsersController {
	public async show(request: Request, response: Response): Promise<Response> {
		const { uid, email } = request.user;

		const showUser = new ShowUserService();

		const user = await showUser.execute({ uid });

		return response.json(user);
	}

	public async create(request: Request, response: Response): Promise<Response> {
		const { uid, nome, email, celular, instagram, crefito, dtNascimento, cpfcnpj, excluido, params } = request.body;

		const { atendimento_duracao, agenda_retroativo, evolucao_repetir, pagamento_valor } = params;

		const createUser = new CreateUserService();
		const user = await createUser.execute({
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

		const createParams = new CreateUserConfigsService();
		const usrConfigs = await createParams.execute({
			atendimento_duracao,
			agenda_retroativo,
			evolucao_repetir,
			pagamento_valor,
			user_uid: uid,
		});
		console.log('usrConfigs: ', usrConfigs);

		return response.json(user);
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const { uid, nome, email, celular, instagram, crefito, dtNascimento, cpfcnpj } = request.body;

		const updateUser = new UpdateUserService();

		const user = await updateUser.execute({
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
