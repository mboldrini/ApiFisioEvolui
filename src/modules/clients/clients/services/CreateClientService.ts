import { ClientsRepository } from '../typeorm/repositories/ClientsRepository';
import { UsersRepository } from '@modules/users/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Clients from '../typeorm/entities/Clients';

interface IRequest {
	user_code: string;
	name: string;
	document?: string;
	email?: string;
	celphone?: string;
	second_celphone?: string;
	instagram?: string;
	address: string;
	latitude?: string;
	longitude?: string;
}

class CreateClientService {
	public async execute({
		user_code,
		name,
		document,
		email,
		celphone,
		second_celphone,
		instagram,
		address,
		latitude,
		longitude,
	}: IRequest): Promise<Clients> {
		const usersRepo = getCustomRepository(UsersRepository);
		const clientRepo = getCustomRepository(ClientsRepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError("User don't exist", 404);

		const clientExists = await clientRepo.findOne({ email: email, user_id: userExists.user_id });
		if (clientExists) throw new AppError('Já existe um paciente cadastrado com esse email', 404);

		const clientInfos = clientRepo.create({
			name: name,
			document,
			email,
			celphone,
			second_celphone,
			instagram,
			address,
			latitude,
			longitude,
			user_id: userExists.user_id,
			enabled: true,
		});

		await clientRepo.save(clientInfos);

		return clientInfos;
	}
}
export default CreateClientService;
