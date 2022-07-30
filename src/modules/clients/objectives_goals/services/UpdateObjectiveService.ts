import { ClientObjectivesRepository } from './../typeorm/repositories/ClientObjectives';
import { UsersRepository } from './../../../users/users/typeorm/repositories/UsersRepository';
import { ClientsRepository } from './../../clients/typeorm/repositories/ClientsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import ClientObjectives from '../typeorm/entities/ClientObjectives';

interface IRequest {
	id: number;
	objectives: string;
	comments?: string;
	date: Date;
	client_id: number;
	user_code: string;
}

class UpdateObjectiveService {
	public async execute({
		id,
		objectives,
		comments,
		date,
		client_id,
		user_code,
	}: IRequest): Promise<ClientObjectives> {
		const usersRepo = getCustomRepository(UsersRepository);
		const clientsRepo = getCustomRepository(ClientsRepository);
		const objectivesRepo = getCustomRepository(ClientObjectivesRepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError("User don't exist", 404);

		const clientExist = await clientsRepo.findOne({ id: client_id, user_id: userExists.user_id });
		if (!clientExist) throw new AppError("This client don't exist", 404);

		const objectiveExist = await objectivesRepo.findOne({ id, client_id: clientExist.id });
		if (!objectiveExist) throw new AppError('Esse Objetivo/Meta não existe!', 404);

		objectiveExist.objectives = objectives;
		if (comments) {
			objectiveExist.comments = comments;
		}
		objectiveExist.date = date;

		await objectivesRepo.save(objectiveExist);

		return objectiveExist;
	}
}
export default UpdateObjectiveService;
