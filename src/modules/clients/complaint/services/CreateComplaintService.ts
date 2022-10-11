import { ComplaintRepository } from './../typeorm/repositories/Complaint';
import { UsersRepository } from './../../../users/users/typeorm/repositories/UsersRepository';
import { ClientsRepository } from './../../clients/typeorm/repositories/ClientsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Complaint from '../typeorm/entities/Complaint';

interface IRequest {
	complaint: string;
	comments?: string;
	date: Date;
	client_id: number;
	user_code: string;
}

class CreateComplaintService {
	public async execute({ complaint, comments, date, client_id, user_code }: IRequest): Promise<Complaint> {
		const usersRepo = getCustomRepository(UsersRepository);
		const clientsRepo = getCustomRepository(ClientsRepository);
		const complaintRepo = getCustomRepository(ComplaintRepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError("User don't exist", 404);

		const clientExist = await clientsRepo.findOne({ id: client_id, user_id: userExists.user_id });
		if (!clientExist) throw new AppError("This client don't exist", 404);

		const newComplaint = await complaintRepo.create({
			complaint,
			comments,
			date,
			client_id: clientExist.id,
			user_id: userExists.user_id,
		});

		await complaintRepo.save(newComplaint);

		return newComplaint;
	}
}
export default CreateComplaintService;
