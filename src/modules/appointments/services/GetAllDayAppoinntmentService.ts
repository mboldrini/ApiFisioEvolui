import { TIMEZONE_LANGUAGE, TIMEZONE_LOCALE } from './../../../shared/DTO';
import { AppointmentsRepository } from '../typeorm/repositories/AppointmentsRepository';
import { UsersRepository } from '@modules/users/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

interface IRequest {
	user_code: string;
	date: Date;
}

class GetAllDayAppointmentService {
	public async execute({ user_code, date }: IRequest): Promise<Object> {
		const userRepo = getCustomRepository(UsersRepository);
		const appointmentRepo = getCustomRepository(AppointmentsRepository);

		const userExist = await userRepo.findOne({ user_code });
		if (!userExist) throw new AppError("This user don't exist");

		const appointments = await appointmentRepo.find({
			date_scheduled: date,
			user_id: userExist.user_id,
			scheduled: true,
		});

		let appointmentsList = appointments.map(appointment => ({
			id: appointment.id,
			description: appointment.description,
			comments: appointment.comments,
			status: appointment.status,
			type: appointment.type,
			date_scheduled: appointment.date_scheduled,
			start_hour: appointment.start_hour,
			end_hour: appointment.end_hour,
			duration: appointment.duration,
			price: appointment.price,
			scheduled: appointment.scheduled,
			serviceType_id: appointment.serviceType_id,
			created_at: appointment.created_at.toLocaleString(TIMEZONE_LANGUAGE),
			updated_at: appointment.updated_at.toLocaleString(TIMEZONE_LANGUAGE),
		}));

		return appointmentsList;
	}
}

export default GetAllDayAppointmentService;
