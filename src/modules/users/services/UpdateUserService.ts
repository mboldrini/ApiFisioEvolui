import { UsersRepository } from './../typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';

interface IRequest {
	id: string;
	celular: string;
	crefito: string;
}

class UpdateUserService {
	public async execute({ id, celular, crefito }: IRequest): Promise<User> {
		const userRepository = getCustomRepository(UsersRepository);

		const user = await userRepository.findById(id);

		if (!user) {
			throw new AppError('Usuario não encontrado');
		}

		user.celular = celular;
		user.crefito = crefito;

		await userRepository.save(user);

		return user;
	}
}

export default UpdateUserService;
