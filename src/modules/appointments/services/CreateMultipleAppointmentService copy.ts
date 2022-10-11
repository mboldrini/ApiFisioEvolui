import { ServicePaymentRepository } from '../../service_payment/typeorm/repositories/ServicePaymentRepository';
import { UsersConfigsRepository } from '../../users/users_configs/typeorm/repositories/UsersConfigsRepository';
import { IAppointmentsList, VerifyAllDaySchedules, SetEndHour } from '../DTO/validateFunctions';
import { ServicesTypesRepository } from '../../services_types/typeorm/repositories/ServicesTypesRepository';
import { AppointmentsRepository } from '../typeorm/repositories/AppointmentsRepository';
import { ClientsRepository } from '../../clients/clients/typeorm/repositories/ClientsRepository';
import { UsersRepository } from '@modules/users/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository, SimpleConsoleLogger, UsingJoinColumnOnlyOnOneSideAllowedError } from 'typeorm';

interface IAppointment {
	type: number;
	date_scheduled: string;
	start_hour: string;
}

interface IRequest {
	user_code: string;
	client_id: number;
	serviceType_id: number;
	appointments: IAppointment[];
}

class CreateMutipleAppointmentService {
	public async execute({ user_code, client_id, serviceType_id, appointments }: IRequest): Promise<Object> {
		const userRepo = getCustomRepository(UsersRepository);
		const clientRepo = getCustomRepository(ClientsRepository);
		const appointmentRepo = getCustomRepository(AppointmentsRepository);
		const serviceTypeRepo = getCustomRepository(ServicesTypesRepository);
		const userConfigsRepo = getCustomRepository(UsersConfigsRepository);

		const userExist = await userRepo.findOne({ user_code });
		if (!userExist) throw new AppError('Esse usuário não existte');

		const userConfigsExist = await userConfigsRepo.findOne({ user_id: userExist.user_id });

		const clientExist = await clientRepo.findOne({ id: client_id });
		if (!clientExist) throw new AppError('Esse cliente não existe');

		const serviceTypeExist = await serviceTypeRepo.findOne({ id: serviceType_id });
		if (!serviceTypeExist) throw new AppError('Esse tipo de serviço não existe', 404);

		let newAppointmentsList = appointments.map(appointment => ({
			user_id: userExist.user_id,
			serviceType_id: serviceType_id,
			client_id: client_id,
			description: '',
			comments: '',
			status: 1,
			type: appointment.type,
			date_scheduled: appointment.date_scheduled,
			start_hour: appointment.start_hour,
			duration: serviceTypeExist.duration,
			end_hour: SetEndHour(appointment.start_hour, serviceTypeExist.duration),
			price: serviceTypeExist.price,
			scheduled: true,
		}));

		let newAppointmentsList2 = newAppointmentsList.filter(
			(a, i) =>
				newAppointmentsList.findIndex(
					s => a.start_hour === s.start_hour && a.date_scheduled === s.date_scheduled,
				) === i,
		);

		const appointment = await appointmentRepo.create(newAppointmentsList2);

		const newAppointment = await appointmentRepo.save(appointment);

		return newAppointment;
	}
}

export default CreateMutipleAppointmentService;
