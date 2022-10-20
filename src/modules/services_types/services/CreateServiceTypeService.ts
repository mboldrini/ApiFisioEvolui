import { ServicesTypesRepository } from '../typeorm/repositories/ServicesTypesRepository';
import { UsersRepository } from '@modules/users/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import ServicesTypes from '../typeorm/entities/ServicesTypes';

interface IRequest {
	name: string;
	description: string;
	duration: string;
	price: number;
	paymentMethod_id: number;
	user_code: string;
}

class CreateServicesTypeService {
	public async execute({
		name,
		description,
		duration,
		price,
		paymentMethod_id,
		user_code,
	}: IRequest): Promise<ServicesTypes> {
		const usersRepo = getCustomRepository(UsersRepository);
		const servicesTypesRepo = getCustomRepository(ServicesTypesRepository);

		const userExist = await usersRepo.findOne({ user_code });
		if (!userExist) throw new AppError("User don't exist", 404);

		const service = servicesTypesRepo.create({
			name,
			description,
			duration,
			price,
			paymentMethod_id: paymentMethod_id,
			user_id: userExist.user_id,
		});

		await servicesTypesRepo.save(service);

		return service;
	}
}
export default CreateServicesTypeService;
