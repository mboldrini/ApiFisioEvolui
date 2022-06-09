import { PaymentMethodRepository } from './../../payment_method/payment_method/typeorm/repositories/PaymentMethodRepository';
import { ServicesTypesRepository } from '../typeorm/repositories/ServicesTypesRepository';
import { UsersRepository } from '@modules/users/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import ServicesTypes from '../typeorm/entities/ServicesTypes';
import { TIMEZONE_LANGUAGE } from '@shared/DTO';
import PaymentMethodUserRepository from './../../payment_method/paymentMethod_user/typeorm/repositories/PaymentMethodUserRepository';

interface IRequest {
	id: number;
	user_code: string;
}

class GetServicesTypeService {
	public async execute({ id, user_code }: IRequest): Promise<Object> {
		const usersRepo = getCustomRepository(UsersRepository);
		const servicesTypesRepo = getCustomRepository(ServicesTypesRepository);
		const paymentMethodRepo = getCustomRepository(PaymentMethodRepository);
		const paymentMethodUserRepo = getCustomRepository(PaymentMethodUserRepository);

		const userExist = await usersRepo.findOne({ user_code });
		if (!userExist) throw new AppError("User don't exist", 404);

		const serviceExist = await servicesTypesRepo.findOne({ id, user_id: userExist.user_id });
		if (!serviceExist) throw new AppError("This service don't exist", 404);

		const paymentMethodUserExist = await paymentMethodUserRepo.findOne({
			id: serviceExist.paymentMethod_id,
			user_id: userExist.user_id,
		});
		if (!paymentMethodUserExist) throw new AppError('Tipo de pagamento não encontrado', 404);

		const paymentMethodExist = await paymentMethodRepo.findOne({ id: paymentMethodUserExist.paymentMethod_id });
		if (!paymentMethodUserExist) throw new AppError('Tipo de pagamento não encontrado - 2', 404);

		let service = {
			id: serviceExist.id,
			name: serviceExist.name,
			description: serviceExist.description,
			duration: serviceExist.duration,
			price: serviceExist.price,
			paymentMethod_id: paymentMethodUserExist.id,
			paymentMethod_name: paymentMethodExist?.name,
			created_at: serviceExist.created_at.toLocaleString(TIMEZONE_LANGUAGE),
			updated_at: serviceExist.updated_at.toLocaleString(TIMEZONE_LANGUAGE),
		};

		return service;
	}
}
export default GetServicesTypeService;
