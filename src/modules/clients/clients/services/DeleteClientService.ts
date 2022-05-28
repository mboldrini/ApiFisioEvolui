import { ClientsRepository } from '../typeorm/repositories/ClientsRepository';
import { UsersRepository } from '@modules/users/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Clients from '../typeorm/entities/Clients';

interface IRequest {
	id: number;
	user_code: string;
}

class DeleteClientService {
	public async execute({ id, user_code }: IRequest): Promise<Clients> {
		const usersRepo = getCustomRepository(UsersRepository);
		const clientRepo = getCustomRepository(ClientsRepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError("User don't exist", 404);

		const clientExist = await clientRepo.findOne({ id, user_id: userExists.user_id, enabled: true });
		if (!clientExist) throw new AppError("This client don't exist ", 404);

		clientExist.enabled = false;

		await clientRepo.save(clientExist);

		return clientExist;
	}
}
export default DeleteClientService;
