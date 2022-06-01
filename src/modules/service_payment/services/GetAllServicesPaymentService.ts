import { TIMEZONE_LANGUAGE } from './../../../shared/DTO';
import { ServicePaymentRepository } from './../typeorm/repositories/ServicePaymentRepository';
import UsersRepository from '@modules/users/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

interface IRequest {
	user_code: string;
}

class GetAllServicesPaymentService {
	public async get({ user_code }: IRequest): Promise<Object> {
		const userRepo = getCustomRepository(UsersRepository);
		const paymentServiceRepo = getCustomRepository(ServicePaymentRepository);

		const userExist = await userRepo.findOne({ user_code });
		if (!userExist) throw new AppError("This user don't exist", 404);

		const servicePaymentExist = await paymentServiceRepo.find({
			user_id: userExist.user_id,
			scheduled: true,
		});

		// const payment = {
		// 	appointment_id: servicePaymentExist.appointment_id,
		// 	price: servicePaymentExist.price,
		// 	comments: servicePaymentExist.comments,
		// 	status: servicePaymentExist.status,
		// 	scheduled: servicePaymentExist.scheduled,
		// 	paymentMethod_id: servicePaymentExist.paymentMethod_id,
		// 	created_at: servicePaymentExist.created_at.toLocaleString(TIMEZONE_LANGUAGE),
		// 	updated_at: servicePaymentExist.updated_at.toLocaleString(TIMEZONE_LANGUAGE),
		// };

		return servicePaymentExist;
	}
}
export default GetAllServicesPaymentService;
