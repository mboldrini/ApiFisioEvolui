import { ServicesTypesRepository } from '@modules/services_types/typeorm/repositories/ServicesTypesRepository';
import { ClientsRepository } from '../typeorm/repositories/ClientsRepository';
import { UsersRepository } from '@modules/users/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Clients from '../typeorm/entities/Clients';

interface IRequest {
	user_code: string;
}

class GetAllClientsService {
	public async execute({ user_code }: IRequest): Promise<object> {
		const usersRepo = getCustomRepository(UsersRepository);
		const clientRepo = getCustomRepository(ClientsRepository);
		const servicesRepo = getCustomRepository(ServicesTypesRepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError("User don't exist", 404);

		const servicesList = await servicesRepo.find({ user_id: userExists.user_id });

		const clientsList = await clientRepo.find({ user_id: userExists.user_id, enabled: true });

		let clientList = clientsList.map(client => ({
			id: client.id,
			name: client.name,
			dataNascimento: client.dataNascimento,
			document: client.document,
			email: client.email,
			celphone: client.celphone,
			address: client.address,
			serviceType_id: client.serviceType_id,
			serviceType_name: servicesList
				.filter(servicesList => {
					if (servicesList.id == client.serviceType_id) return servicesList.name;
				})
				.map(servicesList => {
					return servicesList.name;
				})[0],
		}));

		return clientList;
	}
}
export default GetAllClientsService;
