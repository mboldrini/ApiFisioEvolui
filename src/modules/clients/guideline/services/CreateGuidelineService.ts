import { ClientGuidelineRepository } from './../typeorm/repositories/Guideline';
import { UsersRepository } from '../../../users/users/typeorm/repositories/UsersRepository';
import { ClientsRepository } from '../../clients/typeorm/repositories/ClientsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import ClientGuideline from '../typeorm/entities/Guideline';

interface IRequest {
	guideline: string;
	comments?: string;
	date: Date;
	client_id: number;
	user_code: string;
}

class CreateGuidelineService {
	public async execute({ guideline, comments, date, client_id, user_code }: IRequest): Promise<ClientGuideline> {
		const usersRepo = getCustomRepository(UsersRepository);
		const clientsRepo = getCustomRepository(ClientsRepository);
		const guidelineRepo = getCustomRepository(ClientGuidelineRepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError("User don't exist", 404);

		const clientExist = await clientsRepo.findOne({ id: client_id, user_id: userExists.user_id });
		if (!clientExist) throw new AppError('Esse paciente não existe', 404);

		const newGuideline = guidelineRepo.create({
			guideline,
			comments,
			date,
			client_id: clientExist.id,
			user_id: userExists.user_id,
		});

		await guidelineRepo.save(newGuideline);

		return newGuideline;
	}
}
export default CreateGuidelineService;
