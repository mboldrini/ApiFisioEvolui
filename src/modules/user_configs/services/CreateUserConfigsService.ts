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
	tempo_deslocamento: number;
	data_retroativa: boolean;
	notificacoes: boolean;
}

class CreateUserConfigsService {
	public async execute({
		user_id,
		hora_inicioAtendimento,
		hora_fimAtendimento,
		tempo_atendimento,
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
		if (configExists) {
			throw new AppError('Já existe uma configuração criada p/ esse usuário', 404);
		}

		const userConfigs = usersConfigRepository.create({
			user_id,
			hora_inicioAtendimento,
			hora_fimAtendimento,
			tempo_atendimento,
			tempo_deslocamento,
			data_retroativa,
			notificacoes,
		});

		await usersConfigRepository.save(userConfigs);

		return userConfigs;
	}
}
export default CreateUserConfigsService;
