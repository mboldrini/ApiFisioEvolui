import { DiagnosticRepository } from './../typeorm/repositories/Diagnostic';
import { UsersRepository } from './../../../users/users/typeorm/repositories/UsersRepository';
import { ClientsRepository } from './../../clients/typeorm/repositories/ClientsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Diagnostic from '../typeorm/entities/Diagnostic';

interface IRequest {
	diagnostic: string;
	comments?: string;
	date: Date;
	client_id: number;
	user_code: string;
}

class CreateDiagnosticService {
	public async execute({ diagnostic, comments, date, client_id, user_code }: IRequest): Promise<Diagnostic> {
		const usersRepo = getCustomRepository(UsersRepository);
		const clientsRepo = getCustomRepository(ClientsRepository);
		const diagnosticRepo = getCustomRepository(DiagnosticRepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError("User don't exist", 404);

		const clientExist = await clientsRepo.findOne({ id: client_id, user_id: userExists.user_id });
		if (!clientExist) throw new AppError("This client don't exist", 404);

		const newDiagnostic = diagnosticRepo.create({
			diagnostic,
			comments,
			date,
			client_id: clientExist.id,
			user_id: userExists.user_id,
		});

		await diagnosticRepo.save(newDiagnostic);

		return newDiagnostic;
	}
}
export default CreateDiagnosticService;
