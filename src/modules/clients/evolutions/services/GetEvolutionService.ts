import { ClientEvolutionsRepository } from './../typeorm/repositories/FunctionalDiagnosis';
import { UsersRepository } from '../../../users/users/typeorm/repositories/UsersRepository';
import { ClientsRepository } from '../../clients/typeorm/repositories/ClientsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

interface IRequest {
	id: number;
	client_id: number;
	user_code: string;
}

class GetEvolutionService {
	public async execute({ id, client_id, user_code }: IRequest): Promise<Object> {
		const usersRepo = getCustomRepository(UsersRepository);
		const clientsRepo = getCustomRepository(ClientsRepository);
		const evolutionsRepo = getCustomRepository(ClientEvolutionsRepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError('Esse usuário não existe', 404);

		const clientExist = await clientsRepo.findOne({ id: client_id, user_id: userExists.user_id });
		if (!clientExist) throw new AppError('Esse cliente não existe', 404);

		const evolutionExist = await evolutionsRepo.findOne({ id, client_id: clientExist.id });
		if (!evolutionExist) throw new AppError('Essa evolução não existe!', 404);

		const newEvolution = {
			id: evolutionExist.id,
			about: evolutionExist.about,
			comments: evolutionExist.comments,
			date: evolutionExist.date,
			client_id: evolutionExist.client_id,
			created_at: evolutionExist.created_at,
			updated_at: evolutionExist.updated_at,
		};

		return newEvolution;
	}
}
export default GetEvolutionService;
