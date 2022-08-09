import { ClientObjectivesRepository } from './../typeorm/repositories/ClientObjectives';
import { UsersRepository } from './../../../users/users/typeorm/repositories/UsersRepository';
import { ClientsRepository } from './../../clients/typeorm/repositories/ClientsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import ClientObjectives from '../typeorm/entities/ClientObjectives';

interface IRequest {
	client_id: number;
	user_code: string;
}

class ListObjectiveService {
	public async execute({ client_id, user_code }: IRequest): Promise<Object> {
		const usersRepo = getCustomRepository(UsersRepository);
		const clientsRepo = getCustomRepository(ClientsRepository);
		const objectiveRepo = getCustomRepository(ClientObjectivesRepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError('Esse usuário não existe', 404);

		const clientExist = await clientsRepo.findOne({ id: client_id, user_id: userExists.user_id });
		if (!clientExist) throw new AppError('Esse cliente não existe', 404);

		const clientObjectiveExist = await objectiveRepo.find({ client_id: clientExist.id });
		if (!clientObjectiveExist) throw new AppError('Esse Objetivo/Meta não existe!', 404);

		const newObjectivesList = clientObjectiveExist.map(objectives => ({
			id: objectives.id,
			about: objectives.objectives,
			comments: objectives.comments,
			date: objectives.date,
			client_id: objectives.client_id,
			created_at: objectives.created_at,
			updated_at: objectives.updated_at,
		}));

		return newObjectivesList;
	}
}
export default ListObjectiveService;
