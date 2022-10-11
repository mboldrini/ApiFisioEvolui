import { ClientEvolutionsRepository } from './../typeorm/repositories/FunctionalDiagnosis';
import { UsersRepository } from './../../../users/users/typeorm/repositories/UsersRepository';
import { ClientsRepository } from './../../clients/typeorm/repositories/ClientsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import ClientEvolutions from '../typeorm/entities/Evolutions';

interface IRequest {
	id: number;
	about: string;
	comments?: string;
	date: Date;
	client_id: number;
	user_code: string;
}

class UpdateEvolutionService {
	public async execute({ id, about, comments, date, client_id, user_code }: IRequest): Promise<ClientEvolutions> {
		const usersRepo = getCustomRepository(UsersRepository);
		const clientsRepo = getCustomRepository(ClientsRepository);
		const evolutionsRepo = getCustomRepository(ClientEvolutionsRepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError('Esse usuário não existe', 404);

		const clientExist = await clientsRepo.findOne({ id: client_id, user_id: userExists.user_id });
		if (!clientExist) throw new AppError('Esse paciente não existe', 404);

		const evolutionExist = await evolutionsRepo.findOne({
			id: id,
			user_id: userExists.user_id,
			client_id: clientExist.id,
		});
		if (!evolutionExist) throw new AppError('Essa evolução não existe', 404);

		evolutionExist.about = about;
		if (comments) {
			evolutionExist.comments = comments;
		}
		evolutionExist.date = date;

		await evolutionsRepo.save(evolutionExist);

		return evolutionExist;
	}
}
export default UpdateEvolutionService;
