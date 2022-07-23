import { ClientHDARepository } from './../typeorm/repositories/ClientHDA';
import { UsersRepository } from './../../../users/users/typeorm/repositories/UsersRepository';
import { ClientsRepository } from './../../clients/typeorm/repositories/ClientsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

interface IRequest {
	id: number;
	client_id: number;
	user_code: string;
}

class DeleteHDAService {
	public async execute({ id, client_id, user_code }: IRequest): Promise<any> {
		const usersRepo = getCustomRepository(UsersRepository);
		const clientsRepo = getCustomRepository(ClientsRepository);
		const hdaRepo = getCustomRepository(ClientHDARepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError('Esse usuário não existe', 404);

		const clientExist = await clientsRepo.findOne({ id: client_id, user_id: userExists.user_id });
		if (!clientExist) throw new AppError('Esse cliente não existe', 404);

		const hdaExist = await hdaRepo.findOne({ id, client_id: clientExist.id });
		if (!hdaExist) throw new AppError('Esse HDA não existe!', 404);

		hdaRepo.delete(hdaExist);

		return { message: 'ok' };
	}
}
export default DeleteHDAService;
