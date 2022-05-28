import { ServicePaymentRepository } from './../typeorm/repositories/ServicePaymentRepository';
import { PaymentMethodUserRepository } from './../../payment_method/paymentMethod_user/typeorm/repositories/PaymentMethodUserRepository';
import { AppointmentsRepository } from './../../appointments/typeorm/repositories/AppointmentsRepository';
import UsersRepository from '@modules/users/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import ServicesTypesRepository from '@modules/services_types/typeorm/repositories/ServicesTypesRepository';

interface IRequest {
	user_code: string;
	appointment_id: number;
	comments?: string;
	status: number;
	scheduled: boolean;
	serviceType_id: number;
}

class CreateServicePaymentService {
	public async create({
		user_code,
		appointment_id,
		comments,
		status,
		scheduled,
		serviceType_id,
	}: IRequest): Promise<Object> {
		const userRepo = getCustomRepository(UsersRepository);
		const appointmentRepo = getCustomRepository(AppointmentsRepository);
		const serviceTypeRepo = getCustomRepository(ServicesTypesRepository);
		const paymentServiceRepo = getCustomRepository(ServicePaymentRepository);

		const userExist = await userRepo.findOne({ user_code });
		if (!userExist) throw new AppError("This user don't exist", 404);

		const appointmentExist = await appointmentRepo.findOne({ id: appointment_id, user_id: userExist.user_id });
		if (!appointmentExist) throw new AppError("This appointment don't exist", 404);

		const serviceTypeExist = await serviceTypeRepo.findOne({
			id: serviceType_id,
			user_id: userExist.user_id,
		});
		if (!serviceTypeExist) throw new AppError("This service type method don't exist", 404);

		const servicePaymentExist = await paymentServiceRepo.findOne({
			user_id: userExist.user_id,
			id: appointment_id,
			scheduled: true,
		});
		if (servicePaymentExist) throw new AppError('Already exist an payment for this appointment');

		const payment = paymentServiceRepo.create({
			appointment_id,
			user_id: userExist.user_id,
			price: appointmentExist.price,
			comments,
			status,
			scheduled,
			serviceType_id: 1,
		});

		const newPayment = await paymentServiceRepo.save(payment);

		return newPayment;
	}
}
export default CreateServicePaymentService;
