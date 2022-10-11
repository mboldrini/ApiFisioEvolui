import { ClientsRepository } from '../../clients/clients/typeorm/repositories/ClientsRepository';
import { TIMEZONE_LANGUAGE, TIMEZONE_LOCALE } from '../../../shared/DTO';
import { AppointmentsRepository } from '../typeorm/repositories/AppointmentsRepository';
import { UsersRepository } from '@modules/users/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository, Between } from 'typeorm';
import { startOfMonth, endOfMonth, format } from 'date-fns';

interface IRequest {
	client_id: number;
	user_code: string;
	date: string;
}

function GetDateString(date: Date) {
	return format(date, 'yyyy-MM-dd');
}

class GetAllMonthAppoinntmentsService {
	public async execute({ client_id, user_code, date }: IRequest): Promise<Object> {
		const userRepo = getCustomRepository(UsersRepository);
		const appointmentRepo = getCustomRepository(AppointmentsRepository);
		const clientsRepo = getCustomRepository(ClientsRepository);

		const userExist = await userRepo.findOne({ user_code });
		if (!userExist) throw new AppError('Esse usuário não existe');

		const client = await clientsRepo.findOne({ user_id: userExist.user_id, enabled: true });
		if (!client) throw new AppError('Esse paciente não existe!', 404);

		const appointments = await appointmentRepo.findAllMonth({
			user_id: userExist.user_id,
			client_id: client_id,
			start_date: startOfMonth(new Date(date)),
			end_date: endOfMonth(new Date(date)),
		});

		// let appointmentsList = appointments.map(appointment => ({
		// 	id: appointment.id,
		// 	status: appointment.status,
		// 	type: appointment.type,
		// 	date_scheduled: appointment.date_scheduled,
		// 	start_hour: appointment.start_hour,
		// 	end_hour: appointment.end_hour,
		// 	duration: appointment.duration,
		// 	scheduled: appointment.scheduled,
		// 	serviceType_id: appointment.serviceType_id,
		// 	client_id: appointment.client_id,
		// 	client_name: client
		// 		.filter(client => {
		// 			if (client.id == appointment.client_id) return client.name;
		// 		})
		// 		.map(client => {
		// 			return client.name;
		// 		})[0],
		// }));

		return appointments;
	}
}

export default GetAllMonthAppoinntmentsService;
