import CreateUserAgendaService from '@modules/user_agenda/services/CreateUserAgendaService';
import CreateUserConfigsService from '@modules/user_configs/services/CreateUserConfigsService';
import ShowUserConfigsService from '@modules/user_configs/services/ShowUserConfigsService';
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
		const { uid, nome, email, celular, instagram, crefito, dtNascimento, cpfcnpj, excluido, configs, agenda } =
			request.body;

		const { atendimento_duracao, agenda_retroativo, evolucao_repetir, pagamento_valor } = configs;

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

		const createAgenda = new CreateUserAgendaService();
		const usrAgenda = await createAgenda.execute(agenda, uid);

		return response.json({
			user,
			configs: usrConfigs,
			agenda: usrAgenda,
		});
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const { nome, email, celular, instagram, crefito, dtNascimento, cpfcnpj } = request.body;
		const { uid } = request.user;

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
