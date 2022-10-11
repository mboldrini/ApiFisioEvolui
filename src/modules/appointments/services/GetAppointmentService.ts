import { ServicesTypesRepository } from './../../services_types/typeorm/repositories/ServicesTypesRepository';
import { ClientsRepository } from '../../clients/clients/typeorm/repositories/ClientsRepository';
// import { TIMEZONE_LANGUAGE, TIMEZONE_LOCALE } from '../../../shared/DTO';
import { AppointmentsRepository } from '../typeorm/repositories/AppointmentsRepository';
import { UsersRepository } from '@modules/users/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository, Between } from 'typeorm';
import { startOfMonth, endOfMonth, format } from 'date-fns';

interface IRequest {
	id: number;
	client_id: number;
	user_code: string;
}

function GetDateString(date: Date) {
	return format(date, 'yyyy-MM-dd');
}

class GetAppointmentService {
	public async execute({ id, client_id, user_code }: IRequest): Promise<Object> {
		const userRepo = getCustomRepository(UsersRepository);
		const appointmentRepo = getCustomRepository(AppointmentsRepository);
		const clientsRepo = getCustomRepository(ClientsRepository);
		const servicesTypesRepo = getCustomRepository(ServicesTypesRepository);

		const userExist = await userRepo.findOne({ user_code });
		if (!userExist) throw new AppError('Esse usuário não existe');

		const client = await clientsRepo.findOne({ user_id: userExist.user_id, id: client_id, enabled: true });
		if (!client) throw new AppError('Esse paciente não existe!');

		const appointment = await appointmentRepo.findOne({
			id,
			user_id: userExist.user_id,
			scheduled: true,
		});
		if (!appointment) throw new AppError('Esse agendamento não existe!');

		const serviceType = await servicesTypesRepo.findOne({ id: client.serviceType_id });
		if (!serviceType) throw new AppError('O tipo de atendimento não existe!');

		let appointmentNew = {
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
			serviceType_name: serviceType.name,
			created_at: appointment.created_at,
			updated_at: appointment.updated_at,
		};

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
		// 	client_name: clients
		// 		.filter(client => {
		// 			if (client.id == appointment.client_id) return client.name;
		// 		})
		// 		.map(client => {
		// 			return client.name;
		// 		})[0],
		// }));

		// appointmentsList.forEach(appoint => {
		// 	if (!(GetDateString(appoint.date_scheduled) in dates)) {
		// 		dates[GetDateString(appoint.date_scheduled)] = [];
		// 	}
		// 	dates[GetDateString(appoint.date_scheduled)] = [...dates[GetDateString(appoint.date_scheduled)], appoint];
		// });

		return appointmentNew;
	}
}

export default GetAppointmentService;
