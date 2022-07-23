import { DiagnosticRepository } from './../typeorm/repositories/Diagnostic';
import { UsersRepository } from './../../../users/users/typeorm/repositories/UsersRepository';
import { ClientsRepository } from './../../clients/typeorm/repositories/ClientsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Diagnostic from '../typeorm/entities/Diagnostic';

interface IRequest {
	id: number;
	diagnostic: string;
	comments?: string;
	date: Date;
	client_id: number;
	user_code: string;
}

class UpdateDiagnosticService {
	public async execute({ id, diagnostic, comments, date, client_id, user_code }: IRequest): Promise<Diagnostic> {
		const usersRepo = getCustomRepository(UsersRepository);
		const clientsRepo = getCustomRepository(ClientsRepository);
		const diagnosticRepo = getCustomRepository(DiagnosticRepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError("User don't exist", 404);

		const clientExist = await clientsRepo.findOne({ id: client_id, user_id: userExists.user_id });
		if (!clientExist) throw new AppError("This client don't exist", 404);

		const diagnosticExist = await diagnosticRepo.findOne({ id, client_id: clientExist.id });
		if (!diagnosticExist) throw new AppError('Esse diagnostico não existe!', 404);

		diagnosticExist.diagnostic = diagnostic;
		if (comments) {
			diagnosticExist.comments = comments;
		}
		diagnosticExist.date = date;

		await diagnosticRepo.save(diagnosticExist);

		return diagnosticExist;
	}
}
export default UpdateDiagnosticService;
