import { ClientRespiratoryEvalRepository } from './../typeorm/repositories/RespiratoryEval';
import { UsersRepository } from './../../../users/users/typeorm/repositories/UsersRepository';
import { ClientsRepository } from './../../clients/typeorm/repositories/ClientsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import ClientRespiratoryEval from '../typeorm/entities/RespiratoryEvatuation';

interface IRequest {
	id: number;
	client_id: number;
	user_code: string;
}

class GetRespiratoryEvalService {
	public async execute({ id, client_id, user_code }: IRequest): Promise<ClientRespiratoryEval> {
		const usersRepo = getCustomRepository(UsersRepository);
		const clientsRepo = getCustomRepository(ClientsRepository);
		const respEvalRepo = getCustomRepository(ClientRespiratoryEvalRepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError('Esse usuário não existe', 404);

		const clientExist = await clientsRepo.findOne({ id: client_id, user_id: userExists.user_id });
		if (!clientExist) throw new AppError('Esse cliente não existe', 404);

		const evalExist = await respEvalRepo.findOne({ id, client_id: clientExist.id });
		if (!evalExist) throw new AppError('Essa avaliação respiratória não existe!', 404);

		return evalExist;
	}
}
export default GetRespiratoryEvalService;
