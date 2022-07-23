import { ClientHDARepository } from './../typeorm/repositories/ClientHDA';
import { UsersRepository } from './../../../users/users/typeorm/repositories/UsersRepository';
import { ClientsRepository } from './../../clients/typeorm/repositories/ClientsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import ClientHDA from '../typeorm/entities/ClientHDA';

interface IRequest {
	hda: string;
	comments?: string;
	date: Date;
	client_id: number;
	user_code: string;
}

class CreateClientHDAService {
	public async execute({ hda, comments, date, client_id, user_code }: IRequest): Promise<ClientHDA> {
		const usersRepo = getCustomRepository(UsersRepository);
		const clientsRepo = getCustomRepository(ClientsRepository);
		const clientHdaRepo = getCustomRepository(ClientHDARepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError("User don't exist", 404);

		const clientExist = await clientsRepo.findOne({ id: client_id, user_id: userExists.user_id });
		if (!clientExist) throw new AppError("This client don't exist", 404);

		const newHda = clientHdaRepo.create({
			hda,
			comments,
			date,
			client_id: clientExist.id,
			user_id: userExists.user_id,
		});

		await clientHdaRepo.save(newHda);

		return newHda;
	}
}
export default CreateClientHDAService;
