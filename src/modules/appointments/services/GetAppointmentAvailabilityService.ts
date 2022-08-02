import { UserWorkDaysRepository } from './../../users/user_workDays/typeorm/repositories/UserWorkDaysRepository';
import { UsersConfigsRepository } from './../../users/users_configs/typeorm/repositories/UsersConfigsRepository';
import {
	IAppointmentsList,
	VerifyAllDaySchedules,
	SetEndHour,
	GetTimeStamp,
	GetAllPossibleAppointmentsHours,
	GetWorkDayInfos,
} from './../DTO/validateFunctions';
import { ServicesTypesRepository } from './../../services_types/typeorm/repositories/ServicesTypesRepository';
import { AppointmentsRepository } from './../typeorm/repositories/AppointmentsRepository';
import { ClientsRepository } from './../../clients/clients/typeorm/repositories/ClientsRepository';
import { UsersRepository } from '@modules/users/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

interface IRequest {
	user_code: string;
	client_id: number;
	serviceType_id: number;
	date_scheduled: Date;
	start_hour: string;
}

class GetAppointmentAvailabilityService {
	public async execute({
		user_code,
		client_id,
		serviceType_id,
		date_scheduled,
		start_hour,
	}: IRequest): Promise<Object> {
		const userRepo = getCustomRepository(UsersRepository);
		const userConfigsRepo = getCustomRepository(UsersConfigsRepository);
		const userWorkDaysRepo = getCustomRepository(UserWorkDaysRepository);
		const clientRepo = getCustomRepository(ClientsRepository);
		const appointmentRepo = getCustomRepository(AppointmentsRepository);
		const serviceTypeRepo = getCustomRepository(ServicesTypesRepository);

		const userExist = await userRepo.findOne({ user_code });
		if (!userExist) throw new AppError("This user don't exist", 404);

		const userConfigs = await userConfigsRepo.findOne({ user_id: userExist.user_id });
		if (!userConfigs) throw new AppError("Don't exist an user config for this user", 404);

		// const clientExist = await clientRepo.findOne({ id: client_id });
		// if (!clientExist) throw new AppError("This client don't exist");

		const serviceTypeExist = await serviceTypeRepo.findOne({ id: serviceType_id });
		if (!serviceTypeExist) throw new AppError("This service type don't exist", 404);

		const userWorkDaysExist = await userWorkDaysRepo.findOne({ user_id: userExist.user_id });
		if (!userWorkDaysExist) throw new AppError("Don't exist an workday created for this user");

		const workDayInfos = GetWorkDayInfos(date_scheduled, userWorkDaysExist, userConfigs.user_premium);
		if (!workDayInfos.work) throw new AppError('This date is not available for appointment', 404);

		const allDayAppointments: IAppointmentsList[] = await appointmentRepo.find({ date_scheduled, scheduled: true });

		let theAppointment = {
			date_scheduled,
			start_hour,
			duration: serviceTypeExist.duration,
			end_hour: SetEndHour(start_hour, serviceTypeExist.duration),
			price: serviceTypeExist?.price,
			scheduled: true,
			user_id: userExist?.user_id,
			// client_id,
			serviceType_id,
		};

		let isAvailable = VerifyAllDaySchedules(allDayAppointments, theAppointment);

		let infos = {
			startHour: workDayInfos.start_hour,
			endHour: workDayInfos.end_hour,
			serviceDuration: serviceTypeExist.duration,
			dateScheduled: date_scheduled,
			user_id: userExist.user_id,
			serviceType_id: serviceTypeExist.id,
			// client_id: clientExist.id,
		};

		let allPossibleHours = GetAllPossibleAppointmentsHours(infos);

		let availableHoursList = [] as IAppointmentsList[];

		allPossibleHours.forEach(hoursAvailabled => {
			if (VerifyAllDaySchedules(allDayAppointments, hoursAvailabled)) {
				availableHoursList.push(hoursAvailabled);
			}
		});

		let result = {
			available: isAvailable,
			hours_availabled: availableHoursList,
		};

		return result;

		// if (VerifyAllDaySchedules(allDayAppointments, theAppointment)) {
		// 	return {
		// 		available: true,
		// 	};
		// } else {

		// }
	}
}

export default GetAppointmentAvailabilityService;
