import { ClientFunctionalDiagnosisRepository } from '../typeorm/repositories/FunctionalDiagnosis';
import { UsersRepository } from '../../../users/users/typeorm/repositories/UsersRepository';
import { ClientsRepository } from '../../clients/typeorm/repositories/ClientsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import ClientFunctionalDiagnosis from '../typeorm/entities/FuncionalDiagnosis';

interface IRequest {
	diagnostic: string;
	comments?: string;
	date: Date;
	client_id: number;
	user_code: string;
}

class CreateFunctionalDiagnosisService {
	public async execute({
		diagnostic,
		comments,
		date,
		client_id,
		user_code,
	}: IRequest): Promise<ClientFunctionalDiagnosis> {
		const usersRepo = getCustomRepository(UsersRepository);
		const clientsRepo = getCustomRepository(ClientsRepository);
		const diagnosticRepo = getCustomRepository(ClientFunctionalDiagnosisRepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError("User don't exist", 404);

		const clientExist = await clientsRepo.findOne({ id: client_id, user_id: userExists.user_id });
		if (!clientExist) throw new AppError("This client don't exist", 404);

		const newDiagnostic = diagnosticRepo.create({
			diagnosis: diagnostic,
			comments,
			date,
			client_id: clientExist.id,
			user_id: userExists.user_id,
		});

		await diagnosticRepo.save(newDiagnostic);

		return newDiagnostic;
	}
}
export default CreateFunctionalDiagnosisService;
