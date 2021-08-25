import { UserConfigsRepository } from '../typeorm/repositories/UserConfigsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UserConfigs from '../typeorm/entities/UserConfigs';

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
