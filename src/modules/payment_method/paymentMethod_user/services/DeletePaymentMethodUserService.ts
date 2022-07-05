import { ServicesTypesRepository } from './../../../services_types/typeorm/repositories/ServicesTypesRepository';
import UsersRepository from '@modules/users/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import PaymentMethodUserRepository from '../typeorm/repositories/PaymentMethodUserRepository';

interface IRequest {
	id: number;
	user_code: string;
}

class DeletePaymentMethodUserService {
	public async execute({ id, user_code }: IRequest): Promise<Object> {
		const userRepo = getCustomRepository(UsersRepository);
		const servicesRepo = getCustomRepository(ServicesTypesRepository);
		const paymentMethodUserRepo = getCustomRepository(PaymentMethodUserRepository);

		const userExist = await userRepo.findOne({ user_code });
		if (!userExist) throw new AppError("This user don't exist", 404);

		const paymentUserExists = await paymentMethodUserRepo.findOne({ id, user_id: userExist.user_id });
		if (!paymentUserExists) throw new AppError("This payment method don't exist");

		const serviceExist = await servicesRepo.findAndCount({
			user_id: userExist.user_id,
			paymentMethod_id: paymentUserExists.id,
		});
		if (serviceExist[1] > 0) throw new AppError('Não é possível excluir uma forma de pagamento em uso', 404);

		await paymentMethodUserRepo.delete(paymentUserExists);

		return { message: 'ok' };
	}
}

export default DeletePaymentMethodUserService;
