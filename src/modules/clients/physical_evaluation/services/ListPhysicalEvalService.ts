import { ClientPhysicalEvalRepository } from './../typeorm/repositories/PhysicalEval';
import { UsersRepository } from './../../../users/users/typeorm/repositories/UsersRepository';
import { ClientsRepository } from './../../clients/typeorm/repositories/ClientsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import ClientPhysicalEval from '../typeorm/entities/PhysicalEvaluation';

interface IRequest {
	client_id: number;
	user_code: string;
}

class ListPhysicalEvalService {
	public async execute({ client_id, user_code }: IRequest): Promise<Object> {
		const usersRepo = getCustomRepository(UsersRepository);
		const clientsRepo = getCustomRepository(ClientsRepository);
		const pEvalRepo = getCustomRepository(ClientPhysicalEvalRepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError('Esse usuário não existe', 404);

		const clientExist = await clientsRepo.findOne({ id: client_id, user_id: userExists.user_id });
		if (!clientExist) throw new AppError('Esse cliente não existe', 404);

		const clientEvalExist = await pEvalRepo.find({ client_id: clientExist.id });
		if (!clientEvalExist) throw new AppError('Essa avaliação física não existe!', 404);

		const newClientEvalList = clientEvalExist.map(clientEval => ({
			id: clientEval.id,
			about: clientEval.evaluation,
			comments: clientEval.comments,
			date: clientEval.date,
			client_id: clientEval.client_id,
			created_at: clientEval.created_at,
			updated_at: clientEval.updated_at,
		}));

		return newClientEvalList;
	}
}
export default ListPhysicalEvalService;
