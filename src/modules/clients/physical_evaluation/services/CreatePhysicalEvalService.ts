import { ClientPhysicalEvalRepository } from './../typeorm/repositories/PhysicalEval';
import { UsersRepository } from './../../../users/users/typeorm/repositories/UsersRepository';
import { ClientsRepository } from './../../clients/typeorm/repositories/ClientsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import ClientPhysicalEval from '../typeorm/entities/PhysicalEvaluation';

interface IRequest {
	evaluation: string;
	comments?: string;
	date: Date;
	client_id: number;
	user_code: string;
}

class CreateClientPhysicalEvalService {
	public async execute({ evaluation, comments, date, client_id, user_code }: IRequest): Promise<ClientPhysicalEval> {
		const usersRepo = getCustomRepository(UsersRepository);
		const clientsRepo = getCustomRepository(ClientsRepository);
		const clientPEvalRepo = getCustomRepository(ClientPhysicalEvalRepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError("User don't exist", 404);

		const clientExist = await clientsRepo.findOne({ id: client_id, user_id: userExists.user_id });
		if (!clientExist) throw new AppError('Esse cliente não existe', 404);

		const newEval = clientPEvalRepo.create({
			evaluation,
			comments,
			date,
			client_id: clientExist.id,
			user_id: userExists.user_id,
		});

		await clientPEvalRepo.save(newEval);

		return newEval;
	}
}
export default CreateClientPhysicalEvalService;
