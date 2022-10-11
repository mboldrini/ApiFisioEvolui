import { ClientGuidelineRepository } from './../typeorm/repositories/Guideline';
import { UsersRepository } from './../../../users/users/typeorm/repositories/UsersRepository';
import { ClientsRepository } from './../../clients/typeorm/repositories/ClientsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import ClientGuideline from '../typeorm/entities/Guideline';

interface IRequest {
	client_id: number;
	user_code: string;
}

class ListGuidelineService {
	public async execute({ client_id, user_code }: IRequest): Promise<Object> {
		const usersRepo = getCustomRepository(UsersRepository);
		const clientsRepo = getCustomRepository(ClientsRepository);
		const guidelineRepo = getCustomRepository(ClientGuidelineRepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError('Esse usuário não existe', 404);

		const clientExist = await clientsRepo.findOne({ id: client_id, user_id: userExists.user_id });
		if (!clientExist) throw new AppError('Esse cliente não existe', 404);

		const guidelineExist = await guidelineRepo.find({ client_id: clientExist.id });
		if (!guidelineExist) throw new AppError('Essa orientação não existe!', 404);

		const newGuidelineList = guidelineExist.map(guideline => ({
			id: guideline.id,
			about: guideline.guideline,
			comments: guideline.comments,
			date: guideline.date,
			client_id: guideline.client_id,
			created_at: guideline.created_at,
			updated_at: guideline.updated_at,
		}));

		return newGuidelineList;
	}
}
export default ListGuidelineService;
