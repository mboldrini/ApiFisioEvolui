import { UsersRepository } from '../../../users/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import PaymentMethodUserRepository from '../typeorm/repositories/PaymentMethodUserRepository';
import PaymentMethodRepository from '@modules/payment_method/payment_method/typeorm/repositories/PaymentMethodRepository';
import { TIMEZONE_LANGUAGE } from '@shared/DTO';

interface IRequest {
	id: number;
	name: string;
	description: string;
	user_code: string;
}

class UpdatePaymentMethodUserService {
	public async execute({ name, description, user_code, id }: IRequest): Promise<Object> {
		const paymentMethRepo = getCustomRepository(PaymentMethodRepository);
		const userRepo = getCustomRepository(UsersRepository);
		const paymentMethodUserRepo = getCustomRepository(PaymentMethodUserRepository);

		const userExist = await userRepo.findOne({ user_code });
		if (!userExist) throw new AppError("This user don't exist", 404);

		let paymentMethodSystem;

		/// Find the payment method - system
		const paymentMethodExist = await paymentMethRepo.findOne({ name: name.toUpperCase() });
		if (!paymentMethodExist) {
			const paymentMethod = paymentMethRepo.create({
				name,
			});
			await paymentMethRepo.save(paymentMethod);
			paymentMethodSystem = paymentMethod;
		} else {
			paymentMethodSystem = paymentMethodExist;
		}

		/// Find and update the payment method - USER
		const paymentUserExists = await paymentMethodUserRepo.findOne({ id });
		if (!paymentUserExists) throw new AppError("This payment method don't exist");

		paymentUserExists.description = description;
		paymentUserExists.paymentMethod_id = paymentMethodSystem.id;

		await paymentMethodUserRepo.save(paymentUserExists);

		let paymentUpdated = {
			id: paymentUserExists?.id,
			description: paymentUserExists.description,
			user_id: paymentUserExists.user_id,
			paymentMethod_id: paymentUserExists.paymentMethod_id,
			created_at: paymentUserExists.created_at.toLocaleString(TIMEZONE_LANGUAGE),
			updated_at: paymentUserExists.updated_at.toLocaleString(TIMEZONE_LANGUAGE),
		};

		return paymentUpdated;
	}
}

export default UpdatePaymentMethodUserService;
