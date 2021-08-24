import ShowUserConfigsService from '@modules/user_configs/services/ShowUserConfigsService';
import { Request, Response } from 'express';
import CreateUserConfigsService from '../services/CreateUserConfigsService';

export default class UserConfigsController {
	public async show(request: Request, response: Response): Promise<Response> {
		console.log(request.user);

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
		console.log('UsrConfigsController - usrConfigs: ', usrConfigs);

		return response.json(usrConfigs);
	}
}
