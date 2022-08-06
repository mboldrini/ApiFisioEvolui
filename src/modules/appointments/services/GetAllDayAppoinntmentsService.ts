import { ClientsRepository } from '../../clients/clients/typeorm/repositories/ClientsRepository';
import { TIMEZONE_LANGUAGE, TIMEZONE_LOCALE } from '../../../shared/DTO';
import { AppointmentsRepository } from '../typeorm/repositories/AppointmentsRepository';
import { UsersRepository } from '@modules/users/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository, Between } from 'typeorm';
import { startOfMonth, endOfMonth, format } from 'date-fns';

interface IRequest {
	user_code: string;
	date_scheduled: Date;
}

function GetDateString(date: Date) {
	return format(date, 'yyyy-MM-dd');
}

class GetAllDayAppoinntmentsService {
	public async execute({ user_code, date_scheduled }: IRequest): Promise<Object> {
		const userRepo = getCustomRepository(UsersRepository);
		const appointmentRepo = getCustomRepository(AppointmentsRepository);
		const clientsRepo = getCustomRepository(ClientsRepository);

		const userExist = await userRepo.findOne({ user_code });
		if (!userExist) throw new AppError("This user don't exist");

		const clients = await clientsRepo.find({ user_id: userExist.user_id });

		const appointments = await appointmentRepo.find({
			date_scheduled,
			user_id: userExist.user_id,
			scheduled: true,
		});

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
			client_id: appointment.client_id,
			client_name: clients
				.filter(client => {
					if (client.id == appointment.client_id) return client.name;
				})
				.map(client => {
					return client.name;
				})[0],
		}));

		// appointmentsList.forEach(appoint => {
		// 	console.log(appoint.id);
		// 	if (!(GetDateString(appoint.date_scheduled) in dates)) {
		// 		dates[GetDateString(appoint.date_scheduled)] = [];
		// 	}
		// 	dates[GetDateString(appoint.date_scheduled)] = [...dates[GetDateString(appoint.date_scheduled)], appoint];
		// });

		return appointmentsList;
	}
}

export default GetAllDayAppoinntmentsService;
