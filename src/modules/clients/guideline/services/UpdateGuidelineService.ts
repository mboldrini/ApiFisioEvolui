import { ClientGuidelineRepository } from './../typeorm/repositories/Guideline';
import { UsersRepository } from './../../../users/users/typeorm/repositories/UsersRepository';
import { ClientsRepository } from './../../clients/typeorm/repositories/ClientsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import ClientGuideline from '../typeorm/entities/Guideline';

interface IRequest {
	id: number;
	guideline: string;
	comments?: string;
	date: Date;
	client_id: number;
	user_code: string;
}

class UpdateGuidelineService {
	public async execute({ id, guideline, comments, date, client_id, user_code }: IRequest): Promise<ClientGuideline> {
		const usersRepo = getCustomRepository(UsersRepository);
		const clientsRepo = getCustomRepository(ClientsRepository);
		const guidelineRepo = getCustomRepository(ClientGuidelineRepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError("User don't exist", 404);

		const clientExist = await clientsRepo.findOne({ id: client_id, user_id: userExists.user_id });
		if (!clientExist) throw new AppError("This client don't exist", 404);

		const guidelineExist = await guidelineRepo.findOne({ id, client_id: clientExist.id });
		if (!guidelineExist) throw new AppError('Esse diagnostico não existe!', 404);

		guidelineExist.guideline = guideline;
		if (comments) {
			guidelineExist.comments = comments;
		}
		guidelineExist.date = date;

		await guidelineRepo.save(guidelineExist);

		return guidelineExist;
	}
}
export default UpdateGuidelineService;
