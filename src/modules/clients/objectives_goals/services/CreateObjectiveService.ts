import { ClientObjectivesRepository } from './../typeorm/repositories/ClientObjectives';
import { UsersRepository } from './../../../users/users/typeorm/repositories/UsersRepository';
import { ClientsRepository } from './../../clients/typeorm/repositories/ClientsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import ClientObjectives from '../typeorm/entities/ClientObjectives';

interface IRequest {
	objectives: string;
	comments?: string;
	date: Date;
	client_id: number;
	user_code: string;
}

class CreateClientObjectiveService {
	public async execute({ objectives, comments, date, client_id, user_code }: IRequest): Promise<ClientObjectives> {
		const usersRepo = getCustomRepository(UsersRepository);
		const clientsRepo = getCustomRepository(ClientsRepository);
		const clientObjectiveRepo = getCustomRepository(ClientObjectivesRepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError("User don't exist", 404);

		const clientExist = await clientsRepo.findOne({ id: client_id, user_id: userExists.user_id });
		if (!clientExist) throw new AppError('Esse pacient não existte', 404);

		const newHpp = clientObjectiveRepo.create({
			objectives,
			comments,
			date,
			client_id: clientExist.id,
			user_id: userExists.user_id,
		});

		await clientObjectiveRepo.save(newHpp);

		return newHpp;
	}
}
export default CreateClientObjectiveService;
