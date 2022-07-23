import { ClientHPPRepository } from './../typeorm/repositories/ClientHPP';
import { UsersRepository } from './../../../users/users/typeorm/repositories/UsersRepository';
import { ClientsRepository } from './../../clients/typeorm/repositories/ClientsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import ClientHPP from '../typeorm/entities/ClientHPP';

interface IRequest {
	hpp: string;
	comments?: string;
	date: Date;
	client_id: number;
	user_code: string;
}

class CreateClientHPPService {
	public async execute({ hpp, comments, date, client_id, user_code }: IRequest): Promise<ClientHPP> {
		const usersRepo = getCustomRepository(UsersRepository);
		const clientsRepo = getCustomRepository(ClientsRepository);
		const clientHppRepo = getCustomRepository(ClientHPPRepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError("User don't exist", 404);

		const clientExist = await clientsRepo.findOne({ id: client_id, user_id: userExists.user_id });
		if (!clientExist) throw new AppError("This client don't exist", 404);

		const newHpp = clientHppRepo.create({
			hpp,
			comments,
			date,
			client_id: clientExist.id,
			user_id: userExists.user_id,
		});

		await clientHppRepo.save(newHpp);

		return newHpp;
	}
}
export default CreateClientHPPService;
