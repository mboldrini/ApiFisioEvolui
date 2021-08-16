import { UsersRepository } from './../typeorm/repositories/UsersRepository';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import User from '../typeorm/entities/User';

interface IRequest {
	uid: string;
	nome: string;
	email: string;
	celular: string;
	instagram?: string;
	crefito: string;
	dtNascimento: Date;
	cpfcnpj: string;
	excluido?: number;
}

class CreateUserService {
	public async execute({
		uid,
		nome,
		email,
		celular,
		instagram,
		crefito,
		dtNascimento,
		cpfcnpj,
		excluido,
	}: IRequest): Promise<User> {
		const usersRepository = getCustomRepository(UsersRepository);

		const userExists = await usersRepository.findByUid(uid);
		if (userExists) {
			throw new AppError('Já existe um usuario com o email informado');
		}

		const user = usersRepository.create({
			uid,
			nome,
			email,
			celular,
			instagram,
			crefito,
			dtNascimento,
			cpfcnpj,
			excluido,
		});

		await usersRepository.save(user);

		return user;
	}
}
export default CreateUserService;
