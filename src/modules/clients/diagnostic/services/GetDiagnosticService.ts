import { DiagnosticRepository } from './../typeorm/repositories/Diagnostic';
import { UsersRepository } from './../../../users/users/typeorm/repositories/UsersRepository';
import { ClientsRepository } from './../../clients/typeorm/repositories/ClientsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Diagnostic from '../typeorm/entities/Diagnostic';

interface IRequest {
	id: number;
	client_id: number;
	user_code: string;
}

class GetDiagnosticService {
	public async execute({ id, client_id, user_code }: IRequest): Promise<any> {
		const usersRepo = getCustomRepository(UsersRepository);
		const clientsRepo = getCustomRepository(ClientsRepository);
		const diagnosticRepo = getCustomRepository(DiagnosticRepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError('Esse usuário não existe', 404);

		const clientExist = await clientsRepo.findOne({ id: client_id, user_id: userExists.user_id });
		if (!clientExist) throw new AppError('Esse cliente não existe', 404);

		const diagnosticExist = await diagnosticRepo.findOne({ id, client_id: clientExist.id });
		if (!diagnosticExist) throw new AppError('Esse diagnostico não existe!', 404);

		let newDiagnostic = {
			id: diagnosticExist.id,
			about: diagnosticExist.diagnostic,
			comments: diagnosticExist.comments,
			date: diagnosticExist.date,
			client_id: diagnosticExist.client_id,
			created_at: diagnosticExist.created_at,
			updated_at: diagnosticExist.updated_at,
		};

		return newDiagnostic;
	}
}
export default GetDiagnosticService;
