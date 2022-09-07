import { ServicePaymentRepository } from './../../service_payment/typeorm/repositories/ServicePaymentRepository';
import { UsersConfigsRepository } from './../../users/users_configs/typeorm/repositories/UsersConfigsRepository';
import { IAppointmentsList, VerifyAllDaySchedules, SetEndHour } from './../DTO/validateFunctions';
import { ServicesTypesRepository } from './../../services_types/typeorm/repositories/ServicesTypesRepository';
import { AppointmentsRepository } from './../typeorm/repositories/AppointmentsRepository';
import { ClientsRepository } from './../../clients/clients/typeorm/repositories/ClientsRepository';
import { UsersRepository } from '@modules/users/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository, SimpleConsoleLogger } from 'typeorm';

interface IRequest {
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

class CreateAppointmentService {
	public async execute({
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
		const userConfigsRepo = getCustomRepository(UsersConfigsRepository);

		const userExist = await userRepo.findOne({ user_code });
		if (!userExist) throw new AppError("This user don't exist");

		const userConfigsExist = await userConfigsRepo.findOne({ user_id: userExist.user_id });

		const clientExist = await clientRepo.findOne({ id: client_id });
		if (!clientExist) throw new AppError("This client don't exist");

		const serviceTypeExist = await serviceTypeRepo.findOne({ id: serviceType_id });
		if (!serviceTypeExist) throw new AppError("This service type don't exist", 404);

		const allDayAppointments: IAppointmentsList[] = await appointmentRepo.find({ date_scheduled, scheduled: true });

		let theAppointment = {
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

		if (!VerifyAllDaySchedules(allDayAppointments, theAppointment)) {
			throw new AppError('Already exist an appointment for the selected hour');
		}

		console.log('gg');

		const appointment = await appointmentRepo.create(theAppointment);

		const newAppointment = await appointmentRepo.save(appointment);

		if (userConfigsExist?.user_premium) {
			const servicePaymentRepo = getCustomRepository(ServicePaymentRepository);

			const payment = await servicePaymentRepo.create({
				user_id: userExist.user_id,
				serviceType_id: serviceTypeExist.id,
				comments: ' ',
				appointment_id: newAppointment.id,
				status: 0,
				scheduled: newAppointment.scheduled,
				price: serviceTypeExist.price,
			});
			const newPayment = await servicePaymentRepo.save(payment);
		}

		return newAppointment;
	}
}

export default CreateAppointmentService;
