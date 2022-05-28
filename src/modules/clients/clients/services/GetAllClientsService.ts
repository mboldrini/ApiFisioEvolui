import { ClientsAddressRepository } from '../../clients_address/typeorm/repositories/ClientsAddress';
import { ClientsRepository } from '../typeorm/repositories/ClientsRepository';
import { UsersRepository } from '@modules/users/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Clients from '../typeorm/entities/Clients';
import { TIMEZONE_LANGUAGE } from '@shared/DTO';

interface IRequest {
	user_code: string;
}

interface IAddress {
	address?: string;
	number?: number;
	city?: string;
	district?: string;
	state?: string;
	country?: string;
}

interface IClient {
	id: number;
	name: string;
	document: string;
	email: string;
	celphone: string;
	second_celphone: string;
	instagram: string;
	address: IAddress | undefined;
	created_at: string;
	updated_at: string;
}

class GetAllClientsService {
	public async execute({ user_code }: IRequest): Promise<object> {
		const usersRepo = getCustomRepository(UsersRepository);
		const clientRepo = getCustomRepository(ClientsRepository);
		const clientAddressRepo = getCustomRepository(ClientsAddressRepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError("User don't exist", 404);

		const clientsList = await clientRepo.find({ user_id: userExists.user_id, enabled: true });

		const clientAddressList = await clientAddressRepo.find({ user_id: userExists.user_id });

		let clientList = clientsList.map(client => ({
			id: client.id,
			name: client.name,
			document: client.document,
			email: client.email,
			celphone: client.celphone,
			second_celphone: client.second_celphone,
			instagram: client.instagram,
			address: clientAddressList
				.filter(address => {
					if (address.client_id === client.id) return address;
				})
				.map(pmtd => {
					return {
						address: pmtd.address,
						number: pmtd.number,
						city: pmtd.city,
						district: pmtd.district,
						state: pmtd.state,
						country: pmtd.country,
					};
				})[0],
			created_at: client.created_at.toLocaleString(TIMEZONE_LANGUAGE),
			updated_at: client.updated_at.toLocaleString(TIMEZONE_LANGUAGE),
		}));

		return clientList;
	}
}
export default GetAllClientsService;
