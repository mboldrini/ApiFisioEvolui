import { PaymentMethodRepository } from './../typeorm/repositories/PaymentMethodRepository';
import AppError from '@shared/errors/AppError';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { getCustomRepository } from 'typeorm';
import PaymentMethod from '../typeorm/entities/PaymentMethod';

class CreatePaymentMethodService {
	public async execute(name: string): Promise<PaymentMethod> {
		const paymentMethodRepo = getCustomRepository(PaymentMethodRepository);

		const paymentMethodEists = await paymentMethodRepo.findOne({ name });
		if (paymentMethodEists) {
			return paymentMethodEists;
		}

		const paymentMethod = paymentMethodRepo.create({
			name: name.toUpperCase(),
		});

		await paymentMethodRepo.save(paymentMethod);

		return paymentMethod;
	}
}

export default CreatePaymentMethodService;
