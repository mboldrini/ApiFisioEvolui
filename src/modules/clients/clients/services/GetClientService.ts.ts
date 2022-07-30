import { ClientsRepository } from '../typeorm/repositories/ClientsRepository';
import { UsersRepository } from '@modules/users/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Clients from '../typeorm/entities/Clients';
import { TIMEZONE_LANGUAGE } from '@shared/DTO';

interface IRequest {
	id: number;
	user_code: string;
}

interface IClient {
	id: number;
	name: string;
	document: string;
	email: string;
	celphone: string;
	second_celphone: string;
	instagram: string;
	created_at: string;
	updated_at: string;
}

class GetClientService {
	public async execute({ id, user_code }: IRequest): Promise<IClient> {
		const usersRepo = getCustomRepository(UsersRepository);
		const clientRepo = getCustomRepository(ClientsRepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError("User don't exist", 404);

		const clientExist = await clientRepo.findOne({ id, user_id: userExists.user_id, enabled: true });
		if (!clientExist) throw new AppError("This client don't exist ", 404);

		let client = {
			id: clientExist.id,
			name: clientExist.name,
			document: clientExist.document,
			email: clientExist.email,
			celphone: clientExist.celphone,
			second_celphone: clientExist.second_celphone,
			instagram: clientExist.instagram,
			created_at: clientExist.created_at.toLocaleString(TIMEZONE_LANGUAGE),
			updated_at: clientExist.updated_at.toLocaleString(TIMEZONE_LANGUAGE),
		};

		return client;
	}
}
export default GetClientService;
