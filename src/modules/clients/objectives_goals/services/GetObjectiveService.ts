import { ClientObjectivesRepository } from './../typeorm/repositories/ClientObjectives';
import { UsersRepository } from './../../../users/users/typeorm/repositories/UsersRepository';
import { ClientsRepository } from './../../clients/typeorm/repositories/ClientsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import ClientObjectives from '../typeorm/entities/ClientObjectives';

interface IRequest {
	id: number;
	client_id: number;
	user_code: string;
}

class GetObjectiveService {
	public async execute({ id, client_id, user_code }: IRequest): Promise<Object> {
		const usersRepo = getCustomRepository(UsersRepository);
		const clientsRepo = getCustomRepository(ClientsRepository);
		const objectiveRepo = getCustomRepository(ClientObjectivesRepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError('Esse usuário não existe', 404);

		const clientExist = await clientsRepo.findOne({ id: client_id, user_id: userExists.user_id });
		if (!clientExist) throw new AppError('Esse cliente não existe', 404);

		const objectiveExist = await objectiveRepo.findOne({ id, client_id: clientExist.id });
		if (!objectiveExist) throw new AppError('Esse objetivo/meta não existe!', 404);

		const newObjectives = {
			id: objectiveExist.id,
			about: objectiveExist.objectives,
			comments: objectiveExist.comments,
			date: objectiveExist.date,
			client_id: objectiveExist.client_id,
			created_at: objectiveExist.created_at,
			updated_at: objectiveExist.updated_at,
		};

		return newObjectives;
	}
}
export default GetObjectiveService;
