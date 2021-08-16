import { UsersRepository } from './../typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';

interface IRequest {
	uid: string;
}

class ShowUserService {
	public async execute({ uid }: IRequest): Promise<User> {
		const userRepository = getCustomRepository(UsersRepository);

		const user = await userRepository.findByUid(uid);

		if (!user) {
			throw new AppError('Usuario não encontrado');
		}

		return user;
	}
}

export default ShowUserService;
