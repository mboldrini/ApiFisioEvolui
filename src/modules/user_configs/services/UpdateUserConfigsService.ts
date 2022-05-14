import { UsersRepository } from './../../users/typeorm/repositories/UsersRepository';
import { UserConfigsRepository } from './../typeorm/repositories/UserConfigsRepository';
import UserConfigs from '@modules/user_configs/typeorm/entities/UserConfigs';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

interface IRequest {
	user_id: string;
	hora_inicioAtendimento: number;
	hora_fimAtendimento: number;
	tempo_atendimento: number;
	ignorar_tempoDeslocamento: boolean;
	tempo_deslocamento: number;
	data_retroativa: boolean;
	notificacoes: boolean;
}

class UpdateUserConfigsService {
	public async execute({
		user_id,
		hora_inicioAtendimento,
		hora_fimAtendimento,
		tempo_atendimento,
		ignorar_tempoDeslocamento,
		tempo_deslocamento,
		data_retroativa,
		notificacoes,
	}: IRequest): Promise<UserConfigs> {
		const userRepository = getCustomRepository(UsersRepository);
		const usersConfigRepository = getCustomRepository(UserConfigsRepository);

		const userExists = await userRepository.findById(user_id);
		if (!userExists) {
			throw new AppError('Usuário não enccontrado', 404);
		}

		const configExists = await usersConfigRepository.findOne({
			user_id,
		});
		if (!configExists) {
			throw new AppError('não foi encontrado uma configuração p/ esse usuário', 404);
		}

		configExists.hora_inicioAtendimento = hora_inicioAtendimento;
		configExists.hora_fimAtendimento = hora_fimAtendimento;
		configExists.tempo_atendimento = tempo_atendimento;
		configExists.ignorar_tempoDeslocamento = ignorar_tempoDeslocamento;
		configExists.tempo_deslocamento = tempo_deslocamento;
		configExists.data_retroativa = data_retroativa;
		configExists.notificacoes = notificacoes;

		await usersConfigRepository.save(configExists);

		return configExists;
	}
}
export default UpdateUserConfigsService;
