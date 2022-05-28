import { UsersRepository } from '../../../users/users/typeorm/repositories/UsersRepository';
import { TIMEZONE_LANGUAGE, TIMEZONE_LOCALE } from '../../../../shared/DTO';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import ClientsAddress from '../typeorm/entities/ClientsAddress';
import ClientsAddressRepository from '../typeorm/repositories/ClientsAddress';

interface IRequest {
	user_code: string;
	client_id: number;
}

class GetClientAddressService {
	public async execute({ user_code, client_id }: IRequest): Promise<ClientsAddress | Object> {
		const usersRepo = getCustomRepository(UsersRepository);
		const clientAddressRepo = getCustomRepository(ClientsAddressRepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError("User don't exist", 404);

		let clientAddressExists = await clientAddressRepo.findOne({
			user_id: userExists.user_id,
			client_id: client_id,
		});
		if (!clientAddressExists) throw new AppError("Don't exist an address for this client", 404);

		const address = {
			address: clientAddressExists.address,
			number: clientAddressExists.number,
			city: clientAddressExists.city,
			district: clientAddressExists.district,
			state: clientAddressExists.state,
			country: clientAddressExists.country,
			created_at: clientAddressExists.created_at.toLocaleString(TIMEZONE_LANGUAGE),
			updated_at: clientAddressExists.updated_at.toLocaleString(TIMEZONE_LANGUAGE),
		};

		return address;
	}
}
export default GetClientAddressService;
