import { ClientPhysicalEvalRepository } from './../typeorm/repositories/PhysicalEval';
import { UsersRepository } from './../../../users/users/typeorm/repositories/UsersRepository';
import { ClientsRepository } from './../../clients/typeorm/repositories/ClientsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import ClientPhysicalEval from '../typeorm/entities/PhysicalEvaluation';

interface IRequest {
	id: number;
	client_id: number;
	user_code: string;
}

class GetPhysicalEvalService {
	public async execute({ id, client_id, user_code }: IRequest): Promise<Object> {
		const usersRepo = getCustomRepository(UsersRepository);
		const clientsRepo = getCustomRepository(ClientsRepository);
		const pEvalRepo = getCustomRepository(ClientPhysicalEvalRepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError('Esse usuário não existe', 404);

		const clientExist = await clientsRepo.findOne({ id: client_id, user_id: userExists.user_id });
		if (!clientExist) throw new AppError('Esse cliente não existe', 404);

		const evalExist = await pEvalRepo.findOne({ id, client_id: clientExist.id });
		if (!evalExist) throw new AppError('Essa avaliação física não existe!', 404);

		const newEval = {
			id: evalExist.id,
			about: evalExist.evaluation,
			comments: evalExist.comments,
			date: evalExist.date,
			client_id: evalExist.client_id,
			created_at: evalExist.created_at,
			updated_at: evalExist.updated_at,
		};

		return newEval;
	}
}
export default GetPhysicalEvalService;
