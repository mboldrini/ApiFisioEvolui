import { ClientFunctionalDiagnosisRepository } from './../typeorm/repositories/FunctionalDiagnosis';
import { UsersRepository } from './../../../users/users/typeorm/repositories/UsersRepository';
import { ClientsRepository } from './../../clients/typeorm/repositories/ClientsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import ClientFunctionalDiagnosis from '../typeorm/entities/FuncionalDiagnosis';

interface IRequest {
	client_id: number;
	user_code: string;
}

class ListFunctionalDiagnosticService {
	public async execute({ client_id, user_code }: IRequest): Promise<ClientFunctionalDiagnosis[]> {
		const usersRepo = getCustomRepository(UsersRepository);
		const clientsRepo = getCustomRepository(ClientsRepository);
		const diagnosticRepo = getCustomRepository(ClientFunctionalDiagnosisRepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError('Esse usuário não existe', 404);

		const clientExist = await clientsRepo.findOne({ id: client_id, user_id: userExists.user_id });
		if (!clientExist) throw new AppError('Esse cliente não existe', 404);

		const diagnosticExist = await diagnosticRepo.find({ client_id: clientExist.id });
		if (!diagnosticExist) throw new AppError('Esse diagnostico não existe!', 404);

		return diagnosticExist;
	}
}
export default ListFunctionalDiagnosticService;