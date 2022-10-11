import { ClientRespiratoryEvalRepository } from './../typeorm/repositories/RespiratoryEval';
import { ClientPhysicalEvalRepository } from './../../physical_evaluation/typeorm/repositories/PhysicalEval';
import { UsersRepository } from './../../../users/users/typeorm/repositories/UsersRepository';
import { ClientsRepository } from './../../clients/typeorm/repositories/ClientsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import ClientRespiratoryEval from '../typeorm/entities/RespiratoryEvatuation';

interface IRequest {
	id: number;
	evaluation: string;
	comments?: string;
	date: Date;
	client_id: number;
	user_code: string;
}

class UpdateRespiratoryEvalService {
	public async execute({
		id,
		evaluation,
		comments,
		date,
		client_id,
		user_code,
	}: IRequest): Promise<ClientRespiratoryEval> {
		const usersRepo = getCustomRepository(UsersRepository);
		const clientsRepo = getCustomRepository(ClientsRepository);
		const respRepo = getCustomRepository(ClientRespiratoryEvalRepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError("User don't exist", 404);

		const clientExist = await clientsRepo.findOne({ id: client_id, user_id: userExists.user_id });
		if (!clientExist) throw new AppError("This client don't exist", 404);

		const respExist = await respRepo.findOne({ id, client_id: clientExist.id });
		if (!respExist) throw new AppError('Essa  não existe!', 404);

		respExist.evaluation = evaluation;
		if (comments) {
			respExist.comments = comments;
		}
		respExist.date = date;

		await respRepo.save(respExist);

		return respExist;
	}
}
export default UpdateRespiratoryEvalService;
