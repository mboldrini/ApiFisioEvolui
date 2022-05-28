import { PaymentMethodRepository } from './../../payment_method/typeorm/repositories/PaymentMethodRepository';
import { TIMEZONE_LANGUAGE } from '@shared/DTO';
import { TIMEZONE_LOCALE } from './../../../../shared/DTO';
import UsersRepository from '@modules/users/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import PaymentMethodUserRepository from '../typeorm/repositories/PaymentMethodUserRepository';

interface IRequest {
	id: number;
	user_code: string;
}

class GetPaymentMethodUserService {
	public async execute({ id, user_code }: IRequest): Promise<Object> {
		const userRepo = getCustomRepository(UsersRepository);
		const paymentMethodRepo = getCustomRepository(PaymentMethodRepository);
		const paymentMethodUserRepo = getCustomRepository(PaymentMethodUserRepository);

		const userExist = await userRepo.findOne({ user_code });
		if (!userExist) throw new AppError("This user don't exist", 404);

		const paymentUserExists = await paymentMethodUserRepo.findOne({ id, user_id: userExist.user_id });
		if (!paymentUserExists) throw new AppError("This payment method don't exist");

		const paymentMethod = await paymentMethodRepo.findOne({ id: paymentUserExists.paymentMethod_id });
		if (!paymentMethod) throw new AppError("This payment method don't exist", 404);

		const payment = {
			id: paymentUserExists.id,
			description: paymentUserExists.description,
			paymentMethod_id: paymentUserExists.paymentMethod_id,
			paymentMethod_name: paymentMethod.name,
			created_at: paymentUserExists.created_at.toLocaleString(TIMEZONE_LANGUAGE),
			updated_at: paymentUserExists.updated_at.toLocaleString(TIMEZONE_LANGUAGE),
		};

		return payment;
	}
}

export default GetPaymentMethodUserService;
