import { TIMEZONE_LANGUAGE } from '@shared/DTO';
import { TIMEZONE_LOCALE } from './../../../shared/DTO';
import { ServicesTypesRepository } from '../typeorm/repositories/ServicesTypesRepository';
import { UsersRepository } from '@modules/users/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import ServicesTypes from '../typeorm/entities/ServicesTypes';

interface IRequest {
	user_code: string;
}

class GetAllServicesTypeService {
	public async execute({ user_code }: IRequest): Promise<Object> {
		const usersRepo = getCustomRepository(UsersRepository);
		const servicesTypesRepo = getCustomRepository(ServicesTypesRepository);

		const userExist = await usersRepo.findOne({ user_code });
		if (!userExist) throw new AppError("User don't exist", 404);

		const serviceExist = await servicesTypesRepo.find({ user_id: userExist.user_id });

		const servicesList = serviceExist.map(service => ({
			id: service.id,
			name: service.name,
			description: service.description,
			duration: service.duration,
			price: service.price,
			created_at: service.created_at.toLocaleString(TIMEZONE_LANGUAGE),
			updated_at: service.created_at.toLocaleString(TIMEZONE_LANGUAGE),
		}));

		return servicesList;
	}
}
export default GetAllServicesTypeService;
