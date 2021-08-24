import { UserConfigsRepository } from '../../user_configs/typeorm/repositories/UserConfigsRepository';
import { Request, Response } from 'express';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UsersRepository } from './../typeorm/repositories/UsersRepository';
import UserConfigs from '@modules/user_configs/typeorm/entities/UserConfigs';

interface IRequest {
	uid: string;
}

interface IResponse {
	user: User;
	configs: UserConfigs;
}

class ShowUserService {
	public async execute({ uid }: IRequest): Promise<Object> {
		const userRepository = getCustomRepository(UsersRepository);

		const user = await userRepository.findByUid(uid);

		if (!user) {
			throw new AppError('Usuario não encontrado');
		}

		const userConfigsRepo = getCustomRepository(UserConfigsRepository);
		const configs = await userConfigsRepo.findByUid(uid);
		if (!configs) {
			throw new AppError('Configs de usuario não encontradas');
		}

		return { user, configs }; // ignora pq aparentemente ta funcionando...
	}
}

export default ShowUserService;
