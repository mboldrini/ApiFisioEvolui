import { UsersRepository } from '../../users/typeorm/repositories/UsersRepository';
import { UserConfigsRepository } from '../typeorm/repositories/UserConfigsRepository';
import UserConfigs from '@modules/user_configs/typeorm/entities/UserConfigs';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

interface IRequest {
	user_id: string;
}

class ShowUserConfigsService {
	public async execute({ user_id }: IRequest): Promise<UserConfigs> {
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

		return configExists;
	}
}
export default ShowUserConfigsService;
