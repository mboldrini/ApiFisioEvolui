import { UsersRepository } from './../../../users/users/typeorm/repositories/UsersRepository';
import { PaymentMethodUserRepository } from './../typeorm/repositories/PaymentMethodUserRepository';
import { PaymentMethodRepository } from './../../payment_method/typeorm/repositories/PaymentMethodRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import PaymentMethodUser from '../typeorm/entities/PaymentMethodUser';

interface IRequest {
	name: string;
	description?: string;
	user_code: string;
}

class CreatePaymentMethodUserService {
	public async execute({ name, description, user_code }: IRequest): Promise<Object> {
		const paymentMethRepo = getCustomRepository(PaymentMethodRepository);
		const paymentMethodUserRepo = getCustomRepository(PaymentMethodUserRepository);
		const userRepo = getCustomRepository(UsersRepository);

		let payment;
		let paymentMethodSystem;

		const userExist = await userRepo.findOne({ user_code });
		if (!userExist) throw new AppError("This user don't exist", 404);

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

		//Find the payment method USER
		const paymentMethodUserExists = await paymentMethodUserRepo.findOne({
			user_id: userExist.user_id,
			paymentMethod_id: paymentMethodExist?.id,
		});

		if (paymentMethodUserExists) {
			payment = {
				id: paymentMethodUserExists?.id,
				name: paymentMethodSystem?.name,
				description: paymentMethodUserExists?.description,
			};
		} else {
			const paymentMetUsr = paymentMethodUserRepo.create({
				description: description,
				user_id: userExist.user_id,
				paymentMethod_id: paymentMethodSystem?.id,
			});
			await paymentMethodUserRepo.save(paymentMetUsr);

			payment = {
				id: paymentMetUsr.id,
				name: paymentMethodSystem?.name,
				description: paymentMetUsr.description,
			};
		}

		return payment;
	}
}

export default CreatePaymentMethodUserService;
