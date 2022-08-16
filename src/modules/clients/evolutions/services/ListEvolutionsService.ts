import { ClientEvolutionsRepository } from './../typeorm/repositories/FunctionalDiagnosis';
import { UsersRepository } from './../../../users/users/typeorm/repositories/UsersRepository';
import { ClientsRepository } from './../../clients/typeorm/repositories/ClientsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

interface IRequest {
	client_id: number;
	user_code: string;
}

class ListEvolutionsService {
	public async execute({ client_id, user_code }: IRequest): Promise<Object> {
		const usersRepo = getCustomRepository(UsersRepository);
		const clientsRepo = getCustomRepository(ClientsRepository);
		const evolutionsRepo = getCustomRepository(ClientEvolutionsRepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError('Esse usuário não existe', 404);

		const clientExist = await clientsRepo.findOne({ id: client_id, user_id: userExists.user_id });
		if (!clientExist) throw new AppError('Esse cliente não existe', 404);

		const evolutionExist = await evolutionsRepo.find({ client_id: clientExist.id });
		if (!evolutionExist) throw new AppError('Essa evolução não existe!', 404);

		const newEvolutionsList = evolutionExist.map(evolution => ({
			id: evolution.id,
			about: evolution.about,
			comments: evolution.comments,
			date: evolution.date,
			client_id: evolution.client_id,
			created_at: evolution.created_at,
			updated_at: evolution.updated_at,
		}));

		return newEvolutionsList;
	}
}
export default ListEvolutionsService;
