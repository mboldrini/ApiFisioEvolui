import ShowUserConfigsService from '@modules/user_configs/services/ShowUserConfigsService';
import CreateUserConfigsService from '@modules/user_configs/services/CreateUserConfigsService';
import { Request, Response } from 'express';
import UpdateUserConfigsService from '../services/UpdateUserConfigsService';

export default class UserConfigsController {
	public async create(request: Request, response: Response): Promise<Response> {
		const {
			hora_inicioAtendimento,
			hora_fimAtendimento,
			tempo_atendimento,
			ignorar_tempoDeslocamento,
			tempo_deslocamento,
			data_retroativa,
			notificacoes,
		} = request.body;
		const user_id = request.user.id;

		const createUserConfigs = new CreateUserConfigsService();

		const novaConfig = await createUserConfigs.execute({
			hora_inicioAtendimento,
			hora_fimAtendimento,
			tempo_atendimento,
			ignorar_tempoDeslocamento,
			tempo_deslocamento,
			data_retroativa,
			notificacoes,
			user_id,
		});

		return response.json(novaConfig);
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const {
			hora_inicioAtendimento,
			hora_fimAtendimento,
			tempo_atendimento,
			ignorar_tempoDeslocamento,
			tempo_deslocamento,
			data_retroativa,
			notificacoes,
		} = request.body;
		const user_id = request.user.id;

		const updateUserConfigs = new UpdateUserConfigsService();

		const updateConfig = await updateUserConfigs.execute({
			hora_inicioAtendimento,
			hora_fimAtendimento,
			tempo_atendimento,
			ignorar_tempoDeslocamento,
			tempo_deslocamento,
			data_retroativa,
			notificacoes,
			user_id,
		});

		return response.json(updateConfig);
	}

	public async show(request: Request, response: Response): Promise<Response> {
		const user_id = request.user.id;

		const showUserConfigs = new ShowUserConfigsService();

		const showConfig = await showUserConfigs.execute({
			user_id,
		});

		return response.json(showConfig);
	}
}
