import { ClientsRepository } from '../../clients/typeorm/repositories/ClientsRepository';
import { ClientsAddressRepository } from '../typeorm/repositories/ClientsAddress';
import { UsersRepository } from '../../../users/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import ClientsAddress from '../typeorm/entities/ClientsAddress';

interface IRequest {
	client_id: number;
	user_code: string;
	address?: string;
	number?: number;
	city?: string;
	district?: string;
	state?: string;
	country?: string;
	latitude?: string;
	longitude?: string;
}

class CreateClientAddressService {
	public async execute({
		client_id,
		user_code,
		address,
		number,
		city,
		district,
		state,
		country,
		latitude,
		longitude,
	}: IRequest): Promise<ClientsAddress> {
		const usersRepo = getCustomRepository(UsersRepository);
		const clientRepo = getCustomRepository(ClientsRepository);
		const clientAddressRepo = getCustomRepository(ClientsAddressRepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError("User don't exist", 404);

		const clientExists = await clientRepo.findOne({ id: client_id });
		if (!clientExists) throw new AppError("This client don't exist", 404);

		const clientAddressExists = await clientAddressRepo.findOne({ user_id: userExists.user_id, id: client_id });
		if (clientAddressExists) throw new AppError('Already exist a address for this client', 404);

		const clientAddress = clientAddressRepo.create({
			address,
			number,
			city,
			district,
			state,
			country,
			client_id: clientExists.id,
			user_id: userExists.user_id,
			latitude,
			longitude,
		});

		await clientAddressRepo.save(clientAddress);

		return clientAddress;
	}
}
export default CreateClientAddressService;
