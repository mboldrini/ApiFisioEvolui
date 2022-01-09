import AppError from '@shared/errors/AppError';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
	email: string;
	id: string;
}
interface IResponse {
	token: string;
}

class CreateSessionsService {
	public async execute({ email, id }: IRequest): Promise<IResponse> {
		const usersRepository = getCustomRepository(UsersRepository);
		const user = await usersRepository.findByEmail(email);
		if (!user) {
			throw new AppError('Usuário não encontrado', 401);
		}

		if (id !== user.id) {
			throw new AppError('Usuário inválido', 401);
		}

		const token = sign({ id: id, email: email }, authConfig.jwt.secret, {
			expiresIn: authConfig.jwt.expiresIn,
		});

		return {
			token,
		};
	}
}

export default CreateSessionsService;
