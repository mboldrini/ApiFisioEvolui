import AppError from '@shared/errors/AppError';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
	email: string;
	user_code: string;
	magic_code: string;
}
interface IResponse {
	token: string;
}

class CreateSessionsService {
	public async execute({ email, user_code, magic_code }: IRequest): Promise<IResponse> {
		const usersRepository = getCustomRepository(UsersRepository);

		const user = await usersRepository.findByEmail(email);
		if (!user) {
			throw new AppError('Usuário não encontrado', 401);
		}

		if (user_code !== user.user_code) {
			throw new AppError('Usuário inválido', 401);
		}

		const token = sign({ user_code: user_code, email: email }, authConfig.jwt.secret, {
			expiresIn: authConfig.jwt.expiresIn,
		});

		return {
			token,
		};
	}
}

export default CreateSessionsService;
