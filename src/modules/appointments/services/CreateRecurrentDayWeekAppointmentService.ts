import { ServicePaymentRepository } from '../../service_payment/typeorm/repositories/ServicePaymentRepository';
import { UsersConfigsRepository } from '../../users/users_configs/typeorm/repositories/UsersConfigsRepository';
import { IAppointmentsList, VerifyAllDaySchedules, SetEndHour } from '../DTO/validateFunctions';
import { ServicesTypesRepository } from '../../services_types/typeorm/repositories/ServicesTypesRepository';
import { AppointmentsRepository } from '../typeorm/repositories/AppointmentsRepository';
import { ClientsRepository } from '../../clients/clients/typeorm/repositories/ClientsRepository';
import { UsersRepository } from '@modules/users/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

import { GetEspecificDaysInterval } from '../DTO/validateFunctions';
import UserConfigsController from 'dist/modules/users/users_configs/controllers/UserConfigsController';

interface IRequest {
	user_code: string;
	client_id: number;
	serviceType_id: number;
	status: number;
	type: number;
	date_scheduled: Date;
	start_hour: string;
	recurrent: boolean;
	final_date: Date;
}

class CreateRecurrentDayWeekAppointmentService {
	public async execute({
		user_code,
		client_id,
		serviceType_id,
		status,
		type,
		date_scheduled,
		start_hour,
		recurrent,
		final_date,
	}: IRequest): Promise<Any | void | Object> {
		const userRepo = getCustomRepository(UsersRepository);
		const clientRepo = getCustomRepository(ClientsRepository);
		const appointmentRepo = getCustomRepository(AppointmentsRepository);
		const serviceTypeRepo = getCustomRepository(ServicesTypesRepository);
		//	const userConfigsRepo = getCustomRepository(UsersConfigsRepository);

		const userExist = await userRepo.findOne({ user_code });
		if (!userExist) throw new AppError('Esse usuário não existe');

		//const userConfigsExist = await userConfigsRepo.findOne({ user_id: userExist.user_id });

		const clientExist = await clientRepo.findOne({ id: client_id });
		if (!clientExist) throw new AppError('Esse Cliente não existe');

		const serviceTypeExist = await serviceTypeRepo.findOne({ id: serviceType_id });
		if (!serviceTypeExist) throw new AppError('Esse tipo de serviço não existe', 404);

		const listOfDays = GetEspecificDaysInterval(new Date(date_scheduled), new Date(final_date));

		// eslint-disable-next-line prefer-const
		let vaiAgendar = [];

		for (const diaEscolhido in listOfDays) {
			const dia = listOfDays[diaEscolhido];

			const allDayAppointments: IAppointmentsList[] = await appointmentRepo.find({
				date_scheduled: dia,
				scheduled: true,
			});

			const theAppointment = {
				description: '',
				comments: '',
				status,
				type,
				date_scheduled: dia,
				start_hour,
				duration: serviceTypeExist.duration,
				end_hour: SetEndHour(start_hour, serviceTypeExist.duration),
				price: serviceTypeExist.price,
				scheduled: true,
				user_id: userExist.user_id,
				client_id,
				serviceType_id,
			};

			if (VerifyAllDaySchedules(allDayAppointments, theAppointment)) {
				vaiAgendar.push(theAppointment);
			} else {
				console.log(
					`O agendamento da data ${theAppointment.date_scheduled} não está disponível p/ o horario ${theAppointment.start_hour}`,
				);
			}
		}

		const newAppointment = await appointmentRepo.save(vaiAgendar);

		return newAppointment;

		// const allDayAppointments: IAppointmentsList[] = await appointmentRepo.find({ date_scheduled, scheduled: true });

		// let theAppointment = {
		// 	description,
		// 	comments,
		// 	status,
		// 	type,
		// 	date_scheduled,
		// 	start_hour,
		// 	duration: serviceTypeExist.duration,
		// 	end_hour: SetEndHour(start_hour, serviceTypeExist.duration),
		// 	price: serviceTypeExist.price,
		// 	scheduled: true,
		// 	user_id: userExist.user_id,
		// 	client_id,
		// 	serviceType_id,
		// };

		// if (!VerifyAllDaySchedules(allDayAppointments, theAppointment)) {
		// 	throw new AppError('Already exist an appointment for the selected hour');
		// }

		// const appointment = await appointmentRepo.create(theAppointment);

		// const newAppointment = await appointmentRepo.save(appointment);

		// if (userConfigsExist?.user_premium) {
		// 	const servicePaymentRepo = getCustomRepository(ServicePaymentRepository);

		// 	const payment = await servicePaymentRepo.create({
		// 		user_id: userExist.user_id,
		// 		serviceType_id: serviceTypeExist.id,
		// 		comments: ' ',
		// 		appointment_id: newAppointment.id,
		// 		status: 0,
		// 		scheduled: newAppointment.scheduled,
		// 		price: serviceTypeExist.price,
		// 	});
		// 	const newPayment = await servicePaymentRepo.save(payment);
		// }

		// return newAppointment;
	}
}

export default CreateRecurrentDayWeekAppointmentService;
