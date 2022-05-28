import PaymentMethodRepository from '@modules/payment_method/payment_method/typeorm/repositories/PaymentMethodRepository';
import UsersRepository from '@modules/users/users/typeorm/repositories/UsersRepository';
import { TIMEZONE_LANGUAGE } from '@shared/DTO';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import PaymentMethodUserRepository from '../typeorm/repositories/PaymentMethodUserRepository';

interface IRequest {
	user_code: string;
}

class GetAllPaymentMethodUserService {
	public async execute({ user_code }: IRequest): Promise<Object> {
		const userRepo = getCustomRepository(UsersRepository);
		const paymentMethodRepo = getCustomRepository(PaymentMethodRepository);
		const paymentMethodUserRepo = getCustomRepository(PaymentMethodUserRepository);

		const userExist = await userRepo.findOne({ user_code });
		if (!userExist) throw new AppError("This user don't exist", 404);

		const paymentUserExists = await paymentMethodUserRepo.find({ user_id: userExist.user_id });
		if (!paymentUserExists) throw new AppError("This payment method don't exist");

		const paymentMethod = await paymentMethodRepo.find();
		console.log(paymentMethod);

		const payments = paymentUserExists.map(payment => ({
			id: payment.id,
			description: payment.description,
			paymentMethod_id: payment.paymentMethod_id,
			paymentMethod_name: paymentMethod
				.filter(pmetod => {
					if (pmetod.id === payment.paymentMethod_id) return pmetod.id;
				})
				.map(pmtd => {
					return pmtd.name;
				})[0],
			created_at: payment.created_at.toLocaleString(TIMEZONE_LANGUAGE),
			updated_at: payment.updated_at.toLocaleString(TIMEZONE_LANGUAGE),
		}));

		return payments;
	}
}

export default GetAllPaymentMethodUserService;
