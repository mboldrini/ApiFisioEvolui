import { ComplaintRepository } from './../typeorm/repositories/Complaint';
import { UsersRepository } from '../../../users/users/typeorm/repositories/UsersRepository';
import { ClientsRepository } from '../../clients/typeorm/repositories/ClientsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Complaint from '../typeorm/entities/Complaint';

interface IRequest {
	id: number;
	client_id: number;
	user_code: string;
}

class GetComplaintService {
	public async execute({ id, client_id, user_code }: IRequest): Promise<Complaint> {
		const usersRepo = getCustomRepository(UsersRepository);
		const clientsRepo = getCustomRepository(ClientsRepository);
		const complaintRepo = getCustomRepository(ComplaintRepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError('Esse usuário não existe', 404);

		const clientExist = await clientsRepo.findOne({ id: client_id, user_id: userExists.user_id });
		if (!clientExist) throw new AppError('Esse cliente não existe', 404);

		const complaintExist = await complaintRepo.findOne({ id, client_id: clientExist.id });
		if (!complaintExist) throw new AppError('Essa queixa não existe!', 404);

		return complaintExist;
	}
}
export default GetComplaintService;
