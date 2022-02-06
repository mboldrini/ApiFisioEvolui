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

class UpdateUserConfigService {
	public async execute({
		atendimento_duracao,
		agenda_retroativo,
		evolucao_repetir,
		pagamento_valor,
		user_uid,
	}: IRequest): Promise<UserConfigs> {
		const userConfigRepository = getCustomRepository(UserConfigsRepository);

		const userConfig = await userConfigRepository.findByUid(user_uid);

		if (!userConfig) {
			throw new AppError('Configurações de usuario não encontrada');
		}

		userConfig.atendimento_duracao = atendimento_duracao;
		userConfig.agenda_retroativo = agenda_retroativo;
		userConfig.evolucao_repetir = evolucao_repetir;
		userConfig.pagamento_valor = pagamento_valor;

		await userConfigRepository.save(userConfig);

		return userConfig;
	}
}

export default UpdateUserConfigService;
