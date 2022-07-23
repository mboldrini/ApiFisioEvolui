import { ClientFunctionalDiagnosisRepository } from '../typeorm/repositories/FunctionalDiagnosis';
import { UsersRepository } from '../../../users/users/typeorm/repositories/UsersRepository';
import { ClientsRepository } from '../../clients/typeorm/repositories/ClientsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import ClientFunctionalDiagnosis from '../typeorm/entities/FuncionalDiagnosis';

interface IRequest {
	id: number;
	client_id: number;
	user_code: string;
}

class GetFunctionalDiagnosisService {
	public async execute({ id, client_id, user_code }: IRequest): Promise<ClientFunctionalDiagnosis> {
		const usersRepo = getCustomRepository(UsersRepository);
		const clientsRepo = getCustomRepository(ClientsRepository);
		const fcDiagnosisRepo = getCustomRepository(ClientFunctionalDiagnosisRepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError('Esse usuário não existe', 404);

		const clientExist = await clientsRepo.findOne({ id: client_id, user_id: userExists.user_id });
		if (!clientExist) throw new AppError('Esse cliente não existe', 404);

		const diagnosticExist = await fcDiagnosisRepo.findOne({ id, client_id: clientExist.id });
		if (!diagnosticExist) throw new AppError('Esse diagnostico funcional não existe!', 404);

		return diagnosticExist;
	}
}
export default GetFunctionalDiagnosisService;
