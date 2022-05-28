import { ServicesTypesRepository } from '../typeorm/repositories/ServicesTypesRepository';
import { UsersRepository } from '@modules/users/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import ServicesTypes from '../typeorm/entities/ServicesTypes';

interface IRequest {
	id: number;
	user_code: string;
}

class DeleteServicesTypeService {
	public async execute({ id, user_code }: IRequest): Promise<ServicesTypes> {
		const usersRepo = getCustomRepository(UsersRepository);
		const servicesTypesRepo = getCustomRepository(ServicesTypesRepository);

		const userExist = await usersRepo.findOne({ user_code });
		if (!userExist) throw new AppError("User don't exist", 404);

		const serviceExist = await servicesTypesRepo.findOne({ id, user_id: userExist.user_id });
		if (!serviceExist) throw new AppError("This service don't exist", 404);

		await servicesTypesRepo.delete(serviceExist);

		return serviceExist;
	}
}
export default DeleteServicesTypeService;
