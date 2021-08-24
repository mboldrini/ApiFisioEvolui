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
	user_uid: string;
}

class CreateUserConfigsService {
	public async execute({
		atendimento_duracao,
		agenda_retroativo,
		evolucao_repetir,
		pagamento_valor,
		user_uid,
	}: IRequest): Promise<UserConfigs> {
		const userConfigsRepo = getCustomRepository(UserConfigsRepository);

		const userConfigs = userConfigsRepo.create({
			atendimento_duracao,
			agenda_retroativo,
			evolucao_repetir,
			pagamento_valor,
			user_uid,
		});

		await userConfigsRepo.save(userConfigs);

		return userConfigs;
	}
}

export default CreateUserConfigsService;
