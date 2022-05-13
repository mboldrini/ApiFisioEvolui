import CreateUserConfigsService from '@modules/user_configs/services/CreateUserConfigsService';
import { Request, Response } from 'express';

export default class UserConfigsController {
	public async create(request: Request, response: Response): Promise<Response> {
		const {
			hora_inicioAtendimento,
			hora_fimAtendimento,
			tempo_atendimento,
			tempo_deslocamento,
			data_retroativa,
			notificacoes,
		} = request.body;
		const user_id = request.user.id;

		const createUserConfigs = new CreateUserConfigsService();

		console.log('UsrConfigs');
		console.log(
			`${hora_fimAtendimento} - ${hora_inicioAtendimento} - ${tempo_atendimento} - ${data_retroativa} - ${notificacoes} `,
		);
		console.log(`UsrId: ${user_id}`);

		const novaConfig = await createUserConfigs.execute({
			hora_inicioAtendimento,
			hora_fimAtendimento,
			tempo_atendimento,
			tempo_deslocamento,
			data_retroativa,
			notificacoes,
			user_id,
		});

		return response.json(novaConfig);
	}
}
