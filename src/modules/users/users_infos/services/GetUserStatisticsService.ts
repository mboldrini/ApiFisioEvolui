import { AppointmentsRepository } from './../../../appointments/typeorm/repositories/AppointmentsRepository';
import { ClientsRepository } from './../../../clients/clients/typeorm/repositories/ClientsRepository';
import { UsersRepository } from '@modules/users/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

interface IRequest {
	user_code: string;
}

interface IRetorno {
	qtdPacientes: number;
	qtdAtendimentos: number;
}

class GetUsersStatisticsService {
	public async execute({ user_code }: IRequest): Promise<IRetorno> {
		const usersRepo = getCustomRepository(UsersRepository);
		const userPacientsRepo = getCustomRepository(ClientsRepository);
		const userAtendimentosRepo = getCustomRepository(AppointmentsRepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError('Usuário não existe', 404);

		const usersPacientes = await userPacientsRepo.findAndCount({ user_id: userExists.user_id, enabled: true });

		const userAtendimentos = await userAtendimentosRepo.findAndCount({ user_id: userExists.user_id });

		const retorno: IRetorno = {
			qtdPacientes: Object.keys(usersPacientes[0]).length,
			qtdAtendimentos: Object.keys(userAtendimentos[0]).length,
		};

		return retorno;
	}
}
export default GetUsersStatisticsService;
