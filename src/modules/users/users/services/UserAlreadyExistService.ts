import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import User from '../typeorm/entities/User';

interface IRequest {
	user_code: string;
	email: string;
	magic_code: string;
}

class UserAlreadyExistService {
	public async execute({ user_code, email, magic_code }: IRequest): Promise<Object> /* the default was 'User' */ {
		const usersRepository = getCustomRepository(UsersRepository);

		if (magic_code != 'mufasa') throw new AppError('Where is the magic!?', 500);

		const userExist = await usersRepository.findOne({ user_code, email });
		if (userExist) {
			return { exists: true };
		} else {
			return { exists: false };
		}
	}
}
export default UserAlreadyExistService;
