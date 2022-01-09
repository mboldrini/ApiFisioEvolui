// import { UsersRepository } from './../typeorm/repositories/UsersRepository';
// import AppError from '@shared/errors/AppError';
// import { getCustomRepository } from 'typeorm';
// import User from '../typeorm/entities/User';

// interface IRequest {
// 	uid: string;
// 	nome: string;
// 	celular: string;
// 	instagram?: string;
// 	crefito: string;
// 	dtNascimento: Date;
// 	cpfcnpj: string;
// }

// class UpdateUserService {
// 	public async execute({ id, nome, celular, instagram, crefito, dtNascimento, cpfcnpj }: IRequest): Promise<User> {
// 		const userRepository = getCustomRepository(UsersRepository);

// 		const user = await userRepository.findById(id);

// 		if (!user) {
// 			throw new AppError('Usuario não encontrado');
// 		}

// 		user.nome = nome;
// 		user.celular = celular;
// 		if (instagram) {
// 			user.instagram = instagram;
// 		}
// 		user.crefito = crefito;
// 		user.dtNascimento = dtNascimento;
// 		user.cpfcnpj = cpfcnpj;

// 		await userRepository.save(user);

// 		return user;
// 	}
// }

// export default UpdateUserService;
