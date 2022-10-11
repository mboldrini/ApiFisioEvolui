import { ClientObjectivesRepository } from './../typeorm/repositories/ClientObjectives';
import { UsersRepository } from './../../../users/users/typeorm/repositories/UsersRepository';
import { ClientsRepository } from './../../clients/typeorm/repositories/ClientsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

interface IRequest {
	id: number;
	client_id: number;
	user_code: string;
}

class DeleteObjectiveService {
	public async execute({ id, client_id, user_code }: IRequest): Promise<any> {
		const usersRepo = getCustomRepository(UsersRepository);
		const clientsRepo = getCustomRepository(ClientsRepository);
		const objectiveRepo = getCustomRepository(ClientObjectivesRepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError('Esse usuário não existe', 404);

		const clientExist = await clientsRepo.findOne({ id: client_id, user_id: userExists.user_id });
		if (!clientExist) throw new AppError('Esse cliente não existe', 404);

		const objectiveExist = await objectiveRepo.findOne({ id, client_id: clientExist.id });
		if (!objectiveExist) throw new AppError('Esse Objetivo/Meta não existe!', 404);

		objectiveRepo.delete(objectiveExist);

		return { message: 'ok' };
	}
}
export default DeleteObjectiveService;
