import { TIMEZONE_LANGUAGE, TIMEZONE_LOCALE } from '../../../shared/DTO';
import { AppointmentsRepository } from '../typeorm/repositories/AppointmentsRepository';
import { UsersRepository } from '@modules/users/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { startOfMonth, endOfMonth, format } from 'date-fns';

interface IRequest {
	user_code: string;
	date: Date;
}

function GetDateString(date: Date) {
	return format(date, 'yyyy-MM-dd');
}

class GetAllMonthAppointmentService {
	public async execute({ user_code, date }: IRequest): Promise<Object> {
		const userRepo = getCustomRepository(UsersRepository);
		const appointmentRepo = getCustomRepository(AppointmentsRepository);

		const userExist = await userRepo.findOne({ user_code });
		if (!userExist) throw new AppError("This user don't exist");

		const appointments = await appointmentRepo.findByMonth({
			start_month: startOfMonth(new Date(date)),
			end_month: endOfMonth(new Date(date)),
		});

		let dates = {};

		let appointmentsList = appointments.map(appointment => ({
			id: appointment.id,
			status: appointment.status,
			type: appointment.type,
			date_scheduled: appointment.date_scheduled,
			start_hour: appointment.start_hour,
			end_hour: appointment.end_hour,
			duration: appointment.duration,
			scheduled: appointment.scheduled,
			serviceType_id: appointment.serviceType_id,
		}));

		appointmentsList.forEach(appoint => {
			console.log(appoint.id);
			if (!(GetDateString(appoint.date_scheduled) in dates)) {
				dates[GetDateString(appoint.date_scheduled)] = [];
			}
			dates[GetDateString(appoint.date_scheduled)] = [...dates[GetDateString(appoint.date_scheduled)], appoint];
		});
		console.log(dates);

		return dates;
	}
}

export default GetAllMonthAppointmentService;
