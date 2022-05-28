import { ServicesTypesRepository } from './../../services_types/typeorm/repositories/ServicesTypesRepository';
import { ServicePaymentRepository } from './../typeorm/repositories/ServicePaymentRepository';
import { PaymentMethodUserRepository } from './../../payment_method/paymentMethod_user/typeorm/repositories/PaymentMethodUserRepository';
import { AppointmentsRepository } from './../../appointments/typeorm/repositories/AppointmentsRepository';
import UsersRepository from '@modules/users/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

interface IRequest {
	id: number;
	user_code: string;
	appointment_id: number;
	comments: string;
	status: number;
	scheduled: boolean;
	serviceType_id: number;
}

class UpdateServicePaymentService {
	public async update({
		id,
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

		const serviceTypeExist = await serviceTypeRepo.findOne({ user_id: userExist.user_id, id: serviceType_id });
		if (!serviceTypeExist) throw new AppError("This service type don't exist", 404);

		const servicePaymentExist = await paymentServiceRepo.findOne({
			user_id: userExist.user_id,
			id: id,
			scheduled: true,
		});
		if (!servicePaymentExist) throw new AppError("Don't exist an payment for this appointment");

		servicePaymentExist.appointment_id = appointment_id;
		servicePaymentExist.price = appointmentExist.price;
		servicePaymentExist.comments = comments;
		servicePaymentExist.status = status;
		servicePaymentExist.scheduled = scheduled;
		servicePaymentExist.serviceType_id = serviceType_id;

		await paymentServiceRepo.save(servicePaymentExist);

		return servicePaymentExist;
	}
}
export default UpdateServicePaymentService;
