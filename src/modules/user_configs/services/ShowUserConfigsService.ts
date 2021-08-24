import { UserConfigsRepository } from '../typeorm/repositories/UserConfigsRepository';
import { Request, Response } from 'express';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UserConfigs from '../typeorm/entities/UserConfigs';

interface IRequest {
	uid: string;
}

class ShowUserConfigsService {
	public async execute({ uid }: IRequest): Promise<UserConfigs> {
		const userRepository = getCustomRepository(UserConfigsRepository);

		const userConfigs = await userRepository.findByUid(uid);

		if (!userConfigs) {
			throw new AppError('Configs de usuario nao encontradas');
		}

		return userConfigs;
	}
}

export default ShowUserConfigsService;
