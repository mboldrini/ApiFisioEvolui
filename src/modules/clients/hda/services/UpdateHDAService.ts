import { ClientHDARepository } from './../typeorm/repositories/ClientHDA';
import { UsersRepository } from './../../../users/users/typeorm/repositories/UsersRepository';
import { ClientsRepository } from './../../clients/typeorm/repositories/ClientsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import ClientHDA from '../typeorm/entities/ClientHDA';

interface IRequest {
	id: number;
	hda: string;
	comments?: string;
	date: Date;
	client_id: number;
	user_code: string;
}

class UpdateHDAService {
	public async execute({ id, hda, comments, date, client_id, user_code }: IRequest): Promise<ClientHDA> {
		const usersRepo = getCustomRepository(UsersRepository);
		const clientsRepo = getCustomRepository(ClientsRepository);
		const hdaRepo = getCustomRepository(ClientHDARepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError("User don't exist", 404);

		const clientExist = await clientsRepo.findOne({ id: client_id, user_id: userExists.user_id });
		if (!clientExist) throw new AppError("This client don't exist", 404);

		const hdaExist = await hdaRepo.findOne({ id, client_id: clientExist.id });
		if (!hdaExist) throw new AppError('Esse HDA não existe!', 404);

		hdaExist.hda = hda;
		if (comments) {
			hdaExist.comments = comments;
		}
		hdaExist.date = date;

		await hdaRepo.save(hdaExist);

		return hdaExist;
	}
}
export default UpdateHDAService;
