import { UserConfigsRepository } from '../typeorm/repositories/UserConfigsRepository';
import AppError from '@shared/errors/AppError';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { getCustomRepository } from 'typeorm';
import UserConfigs from '../typeorm/entities/UserConfigs';
import User from '@modules/users/typeorm/entities/User';

interface IRequest {
	atendimento_duracao: string;
	agenda_retroativo: number;
	evolucao_repetir: number;
	pagamento_valor: string;
}

class CreateUserConfigsService {
	public async execute({
		atendimento_duracao,
		agenda_retroativo,
		evolucao_repetir,
		pagamento_valor,
	}: IRequest): Promise<UserConfigs> {
		const userConfigsRepo = getCustomRepository(UserConfigsRepository);

		console.log('atendimento_duracao: ', atendimento_duracao);
		console.log('agenda_retroativo: ', agenda_retroativo);
		console.log('evolucao_repetir: ', evolucao_repetir);
		console.log('pagamento_valor: ', pagamento_valor);
		console.log(' 			');

		// const userConfigsExists = await userConfigsRepo.findByUid(user_uid);
		// if (!userConfigsExists) {
		// 	console.log('USER CONFIGS NAO EXISTE');
		// }

		const userConfigs = userConfigsRepo.create({
			atendimento_duracao,
			agenda_retroativo,
			evolucao_repetir,
			pagamento_valor,
		});

		await userConfigsRepo.save(userConfigs);

		return userConfigs;
	}
}

export default CreateUserConfigsService;
