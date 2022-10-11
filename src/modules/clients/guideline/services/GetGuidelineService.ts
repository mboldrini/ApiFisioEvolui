import { ClientGuidelineRepository } from './../typeorm/repositories/Guideline';
import { UsersRepository } from '../../../users/users/typeorm/repositories/UsersRepository';
import { ClientsRepository } from '../../clients/typeorm/repositories/ClientsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import ClientGuideline from '../typeorm/entities/Guideline';

interface IRequest {
	id: number;
	client_id: number;
	user_code: string;
}

class GetGuidelineService {
	public async execute({ id, client_id, user_code }: IRequest): Promise<Object> {
		const usersRepo = getCustomRepository(UsersRepository);
		const clientsRepo = getCustomRepository(ClientsRepository);
		const guidelineRepo = getCustomRepository(ClientGuidelineRepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError('Esse usuário não existe', 404);

		const clientExist = await clientsRepo.findOne({ id: client_id, user_id: userExists.user_id });
		if (!clientExist) throw new AppError('Esse cliente não existe', 404);

		const guidelineExist = await guidelineRepo.findOne({ id, client_id: clientExist.id });
		if (!guidelineExist) throw new AppError('Essa orientação não existe!', 404);

		const newGuideline = {
			id: guidelineExist.id,
			about: guidelineExist.guideline,
			comments: guidelineExist.comments,
			date: guidelineExist.date,
			client_id: guidelineExist.client_id,
			created_at: guidelineExist.created_at,
			updated_at: guidelineExist.updated_at,
		};

		return newGuideline;
	}
}
export default GetGuidelineService;
