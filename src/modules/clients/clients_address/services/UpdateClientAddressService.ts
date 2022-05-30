import { UsersRepository } from '../../../users/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import ClientsAddress from '../typeorm/entities/ClientsAddress';
import ClientsAddressRepository from '../typeorm/repositories/ClientsAddress';

interface IRequest {
	client_id: number;
	user_code: string;
	address: string;
	number: number;
	city: string;
	district: string;
	state: string;
	country: string;
	latitude: string;
	longitude: string;
}

class UpdateClientAddressService {
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
	}: IRequest): Promise<ClientsAddress | Object> {
		const usersRepo = getCustomRepository(UsersRepository);
		const clientAddressRepo = getCustomRepository(ClientsAddressRepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError("User don't exist", 404);

		const clientAddressExists = await clientAddressRepo.findOne({
			user_id: userExists.user_id,
			client_id: client_id,
		});
		if (!clientAddressExists) throw new AppError("Don't exist an address for this client", 404);

		clientAddressExists.address = address;
		clientAddressExists.number = number;
		clientAddressExists.city = city;
		clientAddressExists.district = district;
		clientAddressExists.state = state;
		clientAddressExists.country = country;
		clientAddressExists.latitude = latitude;
		clientAddressExists.longitude = longitude;

		await clientAddressRepo.save(clientAddressExists);

		return clientAddressExists;
	}
}
export default UpdateClientAddressService;
