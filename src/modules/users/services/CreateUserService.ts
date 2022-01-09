import { UsersRepository } from './../typeorm/repositories/UsersRepository';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import User from '../typeorm/entities/User';

interface IRequest {
	id: string;
	email: string;
	family_name: string;
	given_name: string;
	name: string;
	picture: string;
	crefito: string;
	celular: string;
}

class CreateUserService {
	public async execute({
		id,
		email,
		family_name,
		given_name,
		name,
		picture,
		crefito,
		celular,
	}: IRequest): Promise<User> {
		const usersRepository = getCustomRepository(UsersRepository);

		const userIdExists = await usersRepository.findById(id);
		if (userIdExists) {
			throw new AppError('Já existe um usuario com o ID informado');
		}

		const userEmailExists = await usersRepository.findByEmail(email);
		if (userEmailExists) {
			throw new AppError('Já existe um usuário com o email informado');
		}

		const user = usersRepository.create({
			id,
			family_name,
			given_name,
			name,
			picture,
			email,
			crefito,
			celular,
		});

		console.log(user);

		await usersRepository.save(user);

		return user;
	}
}
export default CreateUserService;
