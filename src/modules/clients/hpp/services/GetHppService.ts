import { ClientHPPRepository } from './../typeorm/repositories/ClientHPP';
import { UsersRepository } from './../../../users/users/typeorm/repositories/UsersRepository';
import { ClientsRepository } from './../../clients/typeorm/repositories/ClientsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import ClientHPP from '../typeorm/entities/ClientHPP';

interface IRequest {
	id: number;
	client_id: number;
	user_code: string;
}

class GetHPPService {
	public async execute({ id, client_id, user_code }: IRequest): Promise<Object> {
		const usersRepo = getCustomRepository(UsersRepository);
		const clientsRepo = getCustomRepository(ClientsRepository);
		const hppRepo = getCustomRepository(ClientHPPRepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError('Esse usuário não existe', 404);

		const clientExist = await clientsRepo.findOne({ id: client_id, user_id: userExists.user_id });
		if (!clientExist) throw new AppError('Esse cliente não existe', 404);

		const hppExist = await hppRepo.findOne({ id, client_id: clientExist.id });
		if (!hppExist) throw new AppError('Esse HPP não existe!', 404);

		const newHpp = {
			id: hppExist.id,
			about: hppExist.hpp,
			comments: hppExist.comments,
			date: hppExist.date,
			client_id: hppExist.client_id,
			created_at: hppExist.created_at,
			updated_at: hppExist.updated_at,
		};

		return newHpp;
	}
}
export default GetHPPService;
