import { UsersRepository } from './../../../users/users/typeorm/repositories/UsersRepository';
import { ClientsRepository } from './../../clients/typeorm/repositories/ClientsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import ClientHDA from '../typeorm/entities/ClientHDA';
import ClientHDARepository from '../typeorm/repositories/ClientHDA';

interface IRequest {
	client_id: number;
	user_code: string;
}

class ListHDAService {
	public async execute({ client_id, user_code }: IRequest): Promise<ClientHDA[]> {
		const usersRepo = getCustomRepository(UsersRepository);
		const clientsRepo = getCustomRepository(ClientsRepository);
		const hdaRepo = getCustomRepository(ClientHDARepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError('Esse usuário não existe', 404);

		const clientExist = await clientsRepo.findOne({ id: client_id, user_id: userExists.user_id });
		if (!clientExist) throw new AppError('Esse cliente não existe', 404);

		const clientHdaExist = await hdaRepo.find({ client_id: clientExist.id });
		if (!clientHdaExist) throw new AppError('Esse HDA não existe!', 404);

		return clientHdaExist;
	}
}
export default ListHDAService;
