import { ClientsRepository } from '../typeorm/repositories/ClientsRepository';
import { UsersRepository } from '@modules/users/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Clients from '../typeorm/entities/Clients';
import { TIMEZONE_LANGUAGE } from '@shared/DTO';

interface IRequest {
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

class GetAllClientsService {
	public async execute({ user_code }: IRequest): Promise<object> {
		const usersRepo = getCustomRepository(UsersRepository);
		const clientRepo = getCustomRepository(ClientsRepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError("User don't exist", 404);

		const clientsList = await clientRepo.find({ user_id: userExists.user_id, enabled: true });

		let clientList = clientsList.map(client => ({
			id: client.id,
			name: client.name,
			dataNascimento: client.dataNascimento,
			document: client.document,
			email: client.email,
			celphone: client.celphone,
			second_celphone: client.second_celphone,
			instagram: client.instagram,
			address: client.address,
			latitude: client.latitude,
			longitude: client.longitude,
			created_at: client.created_at.toLocaleString(TIMEZONE_LANGUAGE),
			updated_at: client.updated_at.toLocaleString(TIMEZONE_LANGUAGE),
		}));

		return clientList;
	}
}
export default GetAllClientsService;
