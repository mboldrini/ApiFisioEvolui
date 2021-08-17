import User from '@modules/users/typeorm/entities/User';
import { Request, Response } from 'express';
import CreateUserParamsService from '../services/CreateUserParamsService';

export default class UserParamsController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { atendimento_duracao, agenda_retroativo, evolucao_repetir, pagamento_valor } = request.body;

		const createUserParams = new CreateUserParamsService();

		const userParams = await createUserParams.execute({
			atendimento_duracao,
			agenda_retroativo,
			evolucao_repetir,
			pagamento_valor,
		});

		return response.json(userParams);
	}
}
