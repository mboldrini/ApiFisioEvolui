import { number } from 'joi';
import { addHours, setMinutes } from 'date-fns';
/* eslint-disable prettier/prettier */
import { UserWorkDaysRepository } from './../../users/user_workDays/typeorm/repositories/UserWorkDaysRepository';
import { format, getDay, isBefore, parse, parseISO, setHours } from 'date-fns';
import { ServicePaymentRepository } from '../../service_payment/typeorm/repositories/ServicePaymentRepository';
import { UsersConfigsRepository } from '../../users/users_configs/typeorm/repositories/UsersConfigsRepository';
import { IAppointmentsList, VerifyAllDaySchedules, SetEndHour, GetAllPossibleAppointmentsHours, GetTimeStamp, GetFinalHour } from '../DTO/validateFunctions';
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
	start_hour: string;
	recurrent: boolean;
	date_scheduled: Date;
	final_date: Date;
}

class CreateRecurrentDayWeekAppointmentService {
	public async execute({ user_code, client_id, serviceType_id, status, type, date_scheduled, start_hour, recurrent, final_date }: IRequest): Promise<Any | void | Object> {
		const userRepo = getCustomRepository(UsersRepository);
		const clientRepo = getCustomRepository(ClientsRepository);
		const appointmentRepo = getCustomRepository(AppointmentsRepository);
		const serviceTypeRepo = getCustomRepository(ServicesTypesRepository);
		const userWorkDaysRepo = getCustomRepository(UserWorkDaysRepository);

		//#region Configurações de busca dos repositorios
		const userExist = await userRepo.findOne({ user_code });
		if (!userExist) throw new AppError('Esse usuário não existe');

		const clientExist = await clientRepo.findOne({ id: client_id });
		if (!clientExist) throw new AppError('Esse Cliente não existe');

		const serviceTypeExist = await serviceTypeRepo.findOne({ id: serviceType_id });
		if (!serviceTypeExist) throw new AppError('Esse tipo de serviço não existe', 404);

		const userWkDays = await userWorkDaysRepo.findOne({ user_id: userExist.user_id });
		if (!userWkDays) throw new AppError('Esse usuário não tem dias de trabalho configurado');
		//#endregion

		/// Pega o intervalo de dias, conforme o range de datas escolhidas
		const listOfDays = GetEspecificDaysInterval(date_scheduled, final_date);

		let vaiAgendar = [];

		for (const diaEscolhido in listOfDays) {
			const dia = listOfDays[diaEscolhido];

			const userWorkDayInfos = GetUserWorkDayInfos(userWkDays, dia);

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
				console.log('?');
			} else {
				const infosAgendamento = {
					startHour: userWorkDayInfos.start_hour,
					endHour: userWorkDayInfos.end_hour,
					serviceDuration: serviceTypeExist.duration,
					dateScheduled: theAppointment.date_scheduled,
					user_id: userExist.user_id,
					serviceType_id: serviceTypeExist.id,
				};

				console.log(infosAgendamento);

				let horarioVaiAgendar = null;

				/// Verifica todas as horas disponiveis para esse agendamento
				const allPossibleHours = GetAllPossibleAppointmentsHours(infosAgendamento);

				console.log('Quero agendar as: ' + start_hour);

				for (let i = 0; i < allPossibleHours.length; i++) {
					if (
						isBefore(GetTimeStamp(allPossibleHours[i].start_hour), GetTimeStamp(theAppointment.start_hour)) &&
						GetTimeStamp(SetEndHour(allPossibleHours[i].start_hour, theAppointment.duration)) <= GetTimeStamp(theAppointment.start_hour) == true
					) {
						horarioVaiAgendar = allPossibleHours[i].start_hour;
					}
					console.log('H: ' + allPossibleHours[i].start_hour);
				}

				console.log('horario mais próximo é: ' + horarioVaiAgendar);

				console.log('		');

				return { 'msg: ': horarioVaiAgendar };

				// return { message: 'lala' };
			}
		}

		return vaiAgendar;

		//const newAppointment = await appointmentRepo.save(vaiAgendar);

		//return newAppointment;

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

interface IUserWorkDays {
	id: number;
	sunday: boolean;
	sunday_startHour: string;
	sunday_endHour: string;
	monday: boolean;
	monday_startHour: string;
	monday_endHour: string;
	tuesday: boolean;
	tuesday_startHour: string;
	tuesday_endHour: string;
	wednesday: boolean;
	wednesday_startHour: string;
	wednesday_endHour: string;
	thursday: boolean;
	thursday_startHour: string;
	thursday_endHour: string;
	friday: boolean;
	friday_startHour: string;
	friday_endHour: string;
	saturday: boolean;
	saturday_startHour: string;
	saturday_endHour: string;
	created_at: Date;
	updated_at: Date;
}

function GetUserWorkDayInfos(userConfigs: IUserWorkDays, dia: Date) {
	switch (getDay(dia)) {
		case 0: {
			return {
				work: userConfigs.sunday,
				start_hour: userConfigs.sunday_startHour,
				end_hour: userConfigs.sunday_endHour,
			};
		}
		case 1: {
			return {
				work: userConfigs.monday,
				start_hour: userConfigs.monday_startHour,
				end_hour: userConfigs.monday_endHour,
			};
		}
		case 2: {
			return {
				work: userConfigs.tuesday,
				start_hour: userConfigs.tuesday_startHour,
				end_hour: userConfigs.tuesday_endHour,
			};
		}
		case 3: {
			return {
				work: userConfigs.wednesday,
				start_hour: userConfigs.wednesday_startHour,
				end_hour: userConfigs.wednesday_endHour,
			};
		}
		case 4: {
			return {
				work: userConfigs.thursday,
				start_hour: userConfigs.thursday_startHour,
				end_hour: userConfigs.thursday_endHour,
			};
		}
		case 5: {
			return {
				work: userConfigs.friday,
				start_hour: userConfigs.friday_startHour,
				end_hour: userConfigs.friday_endHour,
			};
		}
		case 6: {
			return {
				work: userConfigs.saturday,
				start_hour: userConfigs.saturday_startHour,
				end_hour: userConfigs.saturday_endHour,
			};
		}
	}
}
