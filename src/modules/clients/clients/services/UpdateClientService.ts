import { ClientsRepository } from '../typeorm/repositories/ClientsRepository';
import { UsersRepository } from '@modules/users/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Clients from '../typeorm/entities/Clients';

interface IRequest {
	id: number;
	user_code: string;
	name: string;
	document: string;
	email: string;
	celphone: string;
	second_celphone: string;
	instagram: string;
}

class UpdateClientService {
	public async execute({
		id,
		user_code,
		name,
		document,
		email,
		celphone,
		second_celphone,
		instagram,
	}: IRequest): Promise<Clients> {
		const usersRepo = getCustomRepository(UsersRepository);
		const clientRepo = getCustomRepository(ClientsRepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError("User don't exist", 404);

		const clientExist = await clientRepo.findOne({ id, user_id: userExists.user_id });
		if (!clientExist) throw new AppError("This client don't exist ", 404);

		clientExist.name = name;
		clientExist.document = document;
		clientExist.email = email;
		clientExist.celphone = celphone;
		clientExist.second_celphone = second_celphone;
		clientExist.instagram = instagram;

		await clientRepo.save(clientExist);

		return clientExist;
	}
}
export default UpdateClientService;
