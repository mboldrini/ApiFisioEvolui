import { ServicePaymentRepository } from './../../service_payment/typeorm/repositories/ServicePaymentRepository';
import { AppointmentsRepository } from './../typeorm/repositories/AppointmentsRepository';
import { UsersRepository } from '@modules/users/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

interface IRequest {
	user_code: string;
	appointment_id: number;
}

class CancelAppointmentService {
	public async execute({ user_code, appointment_id }: IRequest): Promise<Object> {
		const userRepo = getCustomRepository(UsersRepository);
		const appointmentRepo = getCustomRepository(AppointmentsRepository);
		const servicePaymentRepo = getCustomRepository(ServicePaymentRepository);

		const userExist = await userRepo.findOne({ user_code });
		if (!userExist) throw new AppError("This user don't exist");

		const appointment = await appointmentRepo.findOne({
			id: appointment_id,
			user_id: userExist.user_id,
			scheduled: true,
		});
		if (!appointment) throw new AppError("This appointment don't exist!", 404);

		appointment.scheduled = false;

		await appointmentRepo.save(appointment);

		const servicePaymentExist = await servicePaymentRepo.findOne({
			user_id: userExist.user_id,
			appointment_id: appointment.id,
		});
		if (servicePaymentExist) {
			servicePaymentExist.scheduled = false;
			await servicePaymentRepo.save(servicePaymentExist);
		}

		return { message: 'ok' };
	}
}

export default CancelAppointmentService;
