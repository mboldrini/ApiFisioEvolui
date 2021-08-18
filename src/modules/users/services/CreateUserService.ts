import { UsersRepository } from './../typeorm/repositories/UsersRepository';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import User from '../typeorm/entities/User';

interface IParams {
	atendimento_duracao: string;
	agenda_retroativo: number;
	evolucao_repetir: number;
	pagamento_valor: string;
}

interface IRequest {
	uid: string;
	nome: string;
	email: string;
	celular: string;
	instagram: string;
	crefito: string;
	dtNascimento: Date;
	cpfcnpj: string;
	excluido: number;
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

		const userUidExists = await usersRepository.findByUid(uid);
		if (userUidExists) {
			throw new AppError('Já existe um usuario com o uid informado');
		}

		const userEmailExists = await usersRepository.findByEmail(email);
		if (userEmailExists) {
			throw new AppError('Já existe um usuário com o email informado');
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
