import { ClientRespiratoryEvalRepository } from './../typeorm/repositories/RespiratoryEval';
import { UsersRepository } from './../../../users/users/typeorm/repositories/UsersRepository';
import { ClientsRepository } from './../../clients/typeorm/repositories/ClientsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import ClientRespiratoryEval from '../typeorm/entities/RespiratoryEvatuation';

interface IRequest {
	evaluation: string;
	comments?: string;
	date: Date;
	client_id: number;
	user_code: string;
}

class CreateClientRespiratoryEvalService {
	public async execute({
		evaluation,
		comments,
		date,
		client_id,
		user_code,
	}: IRequest): Promise<ClientRespiratoryEval> {
		const usersRepo = getCustomRepository(UsersRepository);
		const clientsRepo = getCustomRepository(ClientsRepository);
		const clientRespEvalRepo = getCustomRepository(ClientRespiratoryEvalRepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError("User don't exist", 404);

		const clientExist = await clientsRepo.findOne({ id: client_id, user_id: userExists.user_id });
		if (!clientExist) throw new AppError('Esse cliente não existe', 404);

		const newRespEval = clientRespEvalRepo.create({
			evaluation,
			comments,
			date,
			client_id: clientExist.id,
			user_id: userExists.user_id,
		});

		await clientRespEvalRepo.save(newRespEval);

		return newRespEval;
	}
}
export default CreateClientRespiratoryEvalService;
