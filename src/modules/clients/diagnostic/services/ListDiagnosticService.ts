import { DiagnosticRepository } from './../typeorm/repositories/Diagnostic';
import { UsersRepository } from './../../../users/users/typeorm/repositories/UsersRepository';
import { ClientsRepository } from './../../clients/typeorm/repositories/ClientsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Diagnostic from '../typeorm/entities/Diagnostic';

interface IRequest {
	client_id: number;
	user_code: string;
}

class ListDiagnosticService {
	public async execute({ client_id, user_code }: IRequest): Promise<Object> {
		const usersRepo = getCustomRepository(UsersRepository);
		const clientsRepo = getCustomRepository(ClientsRepository);
		const diagnosticRepo = getCustomRepository(DiagnosticRepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError('Esse usuário não existe', 404);

		const clientExist = await clientsRepo.findOne({ id: client_id, user_id: userExists.user_id });
		if (!clientExist) throw new AppError('Esse cliente não existe', 404);

		const diagnosticExist = await diagnosticRepo.find({ client_id: clientExist.id });
		if (!diagnosticExist) throw new AppError('Esse diagnostico não existe!', 404);

		let newDiagnosticList = diagnosticExist.map(diagnostic => ({
			id: diagnostic.id,
			about: diagnostic.diagnostic,
			comments: diagnostic.comments,
			date: diagnostic.date,
			client_id: diagnostic.client_id,
			user_id: diagnostic.user_id,
			created_at: diagnostic.created_at,
			updated_at: diagnostic.updated_at,
		}));

		return newDiagnosticList;
	}
}
export default ListDiagnosticService;
