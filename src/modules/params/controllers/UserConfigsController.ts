import { Request, Response } from 'express';
import CreateUserConfigsService from '../services/CreateUserConfigsService';

export default class UserConfigsController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { atendimento_duracao, agenda_retroativo, evolucao_repetir, pagamento_valor } = request.body;

		let newAgendaRetroativo = parseInt(agenda_retroativo);
		let newEvolucaoRepettir = parseInt(evolucao_repetir);

		console.log('Controller - attendimento_duracao: ', atendimento_duracao);

		const createParams = new CreateUserConfigsService();
		const usrConfigs = await createParams.execute({
			atendimento_duracao,
			agenda_retroativo: newAgendaRetroativo,
			evolucao_repetir: newEvolucaoRepettir,
			pagamento_valor,
		});
		console.log('UsrConfigsController - usrConfigs: ', usrConfigs);

		return response.json(usrConfigs);
	}
}
