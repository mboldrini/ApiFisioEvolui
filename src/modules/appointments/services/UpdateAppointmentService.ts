import { ServicePaymentRepository } from './../../service_payment/typeorm/repositories/ServicePaymentRepository';
import { UsersConfigsRepository } from './../../users/users_configs/typeorm/repositories/UsersConfigsRepository';
import { IAppointmentsList, VerifyAllDaySchedules, SetEndHour } from './../DTO/validateFunctions';
import { ServicesTypesRepository } from './../../services_types/typeorm/repositories/ServicesTypesRepository';
import { AppointmentsRepository } from './../typeorm/repositories/AppointmentsRepository';
import { ClientsRepository } from './../../clients/clients/typeorm/repositories/ClientsRepository';
import { UsersRepository } from '@modules/users/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository, SimpleConsoleLogger } from 'typeorm';
import { isSameDay, isSameHour } from 'date-fns';

interface IRequest {
	id: number;
	user_code: string;
	client_id: number;
	serviceType_id: number;
	description?: string;
	comments?: string;
	status: number;
	type: number;
	date_scheduled: Date;
	start_hour: string;
}

class UpdateAppointmentService {
	public async execute({
		id,
		user_code,
		client_id,
		serviceType_id,
		description,
		comments,
		status,
		type,
		date_scheduled,
		start_hour,
	}: IRequest): Promise<Object> {
		const userRepo = getCustomRepository(UsersRepository);
		const clientRepo = getCustomRepository(ClientsRepository);
		const appointmentRepo = getCustomRepository(AppointmentsRepository);
		const serviceTypeRepo = getCustomRepository(ServicesTypesRepository);
		const servicePaymentRepo = getCustomRepository(ServicePaymentRepository);

		const userExist = await userRepo.findOne({ user_code });
		if (!userExist) throw new AppError("This user don't exist");

		const clientExist = await clientRepo.findOne({ id: client_id });
		if (!clientExist) throw new AppError("This client don't exist");

		const serviceTypeExist = await serviceTypeRepo.findOne({ id: serviceType_id });
		if (!serviceTypeExist) throw new AppError("This service type don't exist", 404);

		const appointment = await appointmentRepo.findOne({ id: id, user_id: userExist.user_id });
		if (!appointment) throw new AppError("This appointment don't exist", 404);

		const servicePaymentExist = await servicePaymentRepo.findOne({
			appointment_id: appointment.id,
			user_id: userExist.user_id,
		});

		const allDayAppointments: IAppointmentsList[] = await appointmentRepo.find({ date_scheduled, scheduled: true });

		let oldappointment = {
			description,
			comments,
			status,
			type,
			date_scheduled,
			start_hour,
			duration: serviceTypeExist.duration,
			end_hour: SetEndHour(start_hour, serviceTypeExist.duration),
			price: serviceTypeExist.price,
			scheduled: true,
			user_id: userExist.user_id,
			client_id,
			serviceType_id,
		};

		if (
			(isSameDay(new Date(date_scheduled), new Date(appointment.date_scheduled)) == false ||
				appointment.start_hour != start_hour) &&
			!VerifyAllDaySchedules(allDayAppointments, oldappointment)
		) {
			throw new AppError('Already exist an appointment for the selected hour');
		}

		if (servicePaymentExist) {
			servicePaymentExist.price = serviceTypeExist.price;
			servicePaymentExist.serviceType_id = serviceTypeExist.id;

			await servicePaymentRepo.save(servicePaymentExist);
		}

		if (appointment) {
			appointment.serviceType_id = serviceType_id;
			if (description) {
				appointment.description = description;
			}
			if (comments) {
				appointment.comments = comments;
			}
			appointment.status = status;
			appointment.type = type;
			appointment.date_scheduled = date_scheduled;
			appointment.start_hour = start_hour;
			appointment.duration = serviceTypeExist.duration;
			appointment.end_hour = SetEndHour(start_hour, serviceTypeExist.duration);
			appointment.price = serviceTypeExist.price;
			appointment.serviceType_id = serviceType_id;

			const newAppointment = await appointmentRepo.save(appointment);

			return newAppointment;
		}

		return { message: 'fail' };
	}
}

export default UpdateAppointmentService;
