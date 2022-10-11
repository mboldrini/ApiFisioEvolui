import { ClientEvolutionsRepository } from '../typeorm/repositories/FunctionalDiagnosis';
import { UsersRepository } from '../../../users/users/typeorm/repositories/UsersRepository';
import { ClientsRepository } from '../../clients/typeorm/repositories/ClientsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import ClientEvolutions from '../typeorm/entities/Evolutions';

interface IRequest {
	about: string;
	comments?: string;
	date: Date;
	client_id: number;
	user_code: string;
}

class CreateEvolutionService {
	public async execute({ about, comments, date, client_id, user_code }: IRequest): Promise<ClientEvolutions> {
		const usersRepo = getCustomRepository(UsersRepository);
		const clientsRepo = getCustomRepository(ClientsRepository);
		const evolutionsRepo = getCustomRepository(ClientEvolutionsRepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError('Esse usuário não existe', 404);

		const evolutionExist = await clientsRepo.findOne({ id: client_id, user_id: userExists.user_id });
		if (!evolutionExist) throw new AppError('Essa evolução não existe', 404);

		const newEvolution = evolutionsRepo.create({
			about: about,
			comments,
			date,
			client_id: evolutionExist.id,
			user_id: userExists.user_id,
		});

		await evolutionsRepo.save(newEvolution);

		return newEvolution;
	}
}
export default CreateEvolutionService;
