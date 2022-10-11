import { ClientPhysicalEvalRepository } from './../typeorm/repositories/PhysicalEval';
import { UsersRepository } from './../../../users/users/typeorm/repositories/UsersRepository';
import { ClientsRepository } from './../../clients/typeorm/repositories/ClientsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import ClientPhysicalEval from '../typeorm/entities/PhysicalEvaluation';

interface IRequest {
	id: number;
	evaluation: string;
	comments?: string;
	date: Date;
	client_id: number;
	user_code: string;
}

class UpdatePhysicalEvalService {
	public async execute({
		id,
		evaluation,
		comments,
		date,
		client_id,
		user_code,
	}: IRequest): Promise<ClientPhysicalEval> {
		const usersRepo = getCustomRepository(UsersRepository);
		const clientsRepo = getCustomRepository(ClientsRepository);
		const hppRepo = getCustomRepository(ClientPhysicalEvalRepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError("User don't exist", 404);

		const clientExist = await clientsRepo.findOne({ id: client_id, user_id: userExists.user_id });
		if (!clientExist) throw new AppError("This client don't exist", 404);

		const hppExist = await hppRepo.findOne({ id, client_id: clientExist.id });
		if (!hppExist) throw new AppError('Essa avaliação física não existe!', 404);

		hppExist.evaluation = evaluation;
		if (comments) {
			hppExist.comments = comments;
		}
		hppExist.date = date;

		await hppRepo.save(hppExist);

		return hppExist;
	}
}
export default UpdatePhysicalEvalService;
