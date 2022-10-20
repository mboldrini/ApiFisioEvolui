import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import User from '../typeorm/entities/User';

interface IRequest {
	user_code: string;
	name: string;
	family_name: string;
	given_name: string;
	picture: string;
	email: string;
}

class CreateUserService {
	public async execute({
		user_code,
		name,
		family_name,
		given_name,
		picture,
		email,
	}: IRequest): Promise<any> /* the default was 'User' */ {
		const usersRepository = getCustomRepository(UsersRepository);

		const userIdExists = await usersRepository.findById(user_code);
		if (userIdExists) throw new AppError('Já existe um usuario com o ID informado', 404);

		const userEmailExists = await usersRepository.findByEmail(email);
		if (userEmailExists) throw new AppError('Já existe um usuário com o email informado', 404);

		const user = usersRepository.create({
			user_code: '112545285895674179379',
			name,
			family_name,
			given_name,
			picture,
			email,
			enabled: true,
		});

		await usersRepository.save(user);

		return { message: 'ok' };
	}
}
export default CreateUserService;
