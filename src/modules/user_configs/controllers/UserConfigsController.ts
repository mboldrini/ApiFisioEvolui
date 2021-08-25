import ShowUserConfigsService from '@modules/user_configs/services/ShowUserConfigsService';
import { Console } from 'console';
import { Request, Response } from 'express';
import CreateUserConfigsService from '../services/CreateUserConfigsService';
import UpdateUserConfigService from '../services/UpdateUserConfigService';

export default class UserConfigsController {
	public async show(request: Request, response: Response): Promise<Response> {
		const { uid } = request.user;

		const showUser = new ShowUserConfigsService();
		const user = await showUser.execute({ uid });

		return response.json(user);
	}

	public async create(request: Request, response: Response): Promise<Response> {
		const { atendimento_duracao, agenda_retroativo, evolucao_repetir, pagamento_valor, user_uid } = request.body;

		let newAgendaRetroativo = parseInt(agenda_retroativo);
		let newEvolucaoRepettir = parseInt(evolucao_repetir);

		const createParams = new CreateUserConfigsService();
		const usrConfigs = await createParams.execute({
			atendimento_duracao,
			agenda_retroativo: newAgendaRetroativo,
			evolucao_repetir: newEvolucaoRepettir,
			pagamento_valor,
			user_uid,
		});

		return response.json(usrConfigs);
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const { atendimento_duracao, agenda_retroativo, evolucao_repetir, pagamento_valor } = request.body;
		const { uid } = request.user;

		const updateUser = new UpdateUserConfigService();

		const user = await updateUser.execute({
			atendimento_duracao,
			agenda_retroativo,
			evolucao_repetir,
			pagamento_valor,
			user_uid: uid,
		});

		return response.json(user);
	}
}
