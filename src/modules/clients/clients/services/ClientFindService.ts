import { ServicesTypesRepository } from '@modules/services_types/typeorm/repositories/ServicesTypesRepository';
import { ClientsRepository } from '../typeorm/repositories/ClientsRepository';
import { UsersRepository } from '@modules/users/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Clients from '../typeorm/entities/Clients';
import { TIMEZONE_LANGUAGE } from '@shared/DTO';

interface IRequest {
	user_code: string;
	name?: string;
	cpf?: string;
	email?: string;
	telefone?: string;
	endereco?: string;
	tipoServico?: number;
}

interface IClientReturn {
	id: number;
	name: string;
	dataNascimento: Date;
	document: string;
	email: string;
	celphone: string;
	second_celphone: string;
	instagram: string;
	address: string;
	latitude: string;
	longitude: string;
	serviceType: {
		id: number;
		name: string;
		description: string;
	};
	created_at: string;
	updated_at: string;
}

class ClientFindService {
	public async execute({
		user_code,
		name,
		cpf,
		email,
		telefone,
		endereco,
		tipoServico,
	}: IRequest): Promise<IClientReturn[] | void> {
		const usersRepo = getCustomRepository(UsersRepository);
		const clientRepo = getCustomRepository(ClientsRepository);
		const serviceTypeRepo = getCustomRepository(ServicesTypesRepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError('Esse usuário não existe', 404);

		const serviceExists = await serviceTypeRepo.find({ user_id: userExists.user_id });
		if (!serviceExists) throw new AppError('Não foi encontrado nenhum tipo de serviço cadastrado');

		const serviceList = serviceExists.map(service => ({
			id: service.id,
			name: service.name,
			description: service.description,
		}));

		let clientsList;
		if (name) {
			clientsList = await clientRepo.findByName({ user_id: userExists.user_id, nome: name });
		}
		if (cpf) {
			clientsList = await clientRepo.findByCPF({ user_id: userExists.user_id, cpf: cpf });
		}
		if (email) {
			clientsList = await clientRepo.findByEmail({ user_id: userExists.user_id, email: email });
		}
		if (telefone) {
			clientsList = await clientRepo.findByTelefone({ user_id: userExists.user_id, celphone: telefone });
		}
		if (endereco) {
			clientsList = await clientRepo.findByAddress({ user_id: userExists.user_id, address: endereco });
		}
		if (tipoServico) {
			clientsList = await clientRepo.findByServiceType({
				user_id: userExists.user_id,
				serviceType_id: tipoServico,
			});
		}

		const clients = clientsList?.map(client => ({
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

			serviceType: serviceList.filter(pmetod => {
				if (pmetod.id === client.serviceType_id) return pmetod.id;
			})[0],
			created_at: client.created_at.toLocaleString(TIMEZONE_LANGUAGE),
			updated_at: client.updated_at.toLocaleString(TIMEZONE_LANGUAGE),
		}));

		return clients;
	}
}
export default ClientFindService;
