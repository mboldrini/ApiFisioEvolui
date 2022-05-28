import { TIMEZONE_LANGUAGE } from './../../../shared/DTO';
import { ServicePaymentRepository } from './../typeorm/repositories/ServicePaymentRepository';
import UsersRepository from '@modules/users/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

interface IRequest {
	user_code: string;
	id: number;
}

class GetServicePaymentService {
	public async get({ user_code, id }: IRequest): Promise<Object> {
		const userRepo = getCustomRepository(UsersRepository);
		const paymentServiceRepo = getCustomRepository(ServicePaymentRepository);

		const userExist = await userRepo.findOne({ user_code });
		if (!userExist) throw new AppError("This user don't exist", 404);

		const servicePaymentExist = await paymentServiceRepo.findOne({
			user_id: userExist.user_id,
			id,
			scheduled: true,
		});
		if (!servicePaymentExist) throw new AppError("Don't exist an payment for this appointment");

		const payment = {
			appointment_id: servicePaymentExist.appointment_id,
			price: servicePaymentExist.price,
			comments: servicePaymentExist.comments,
			status: servicePaymentExist.status,
			scheduled: servicePaymentExist.scheduled,
			paymentMethod_id: servicePaymentExist.paymentMethod_id,
			created_at: servicePaymentExist.created_at.toLocaleString(TIMEZONE_LANGUAGE),
			updated_at: servicePaymentExist.updated_at.toLocaleString(TIMEZONE_LANGUAGE),
		};

		return payment;
	}
}
export default GetServicePaymentService;
