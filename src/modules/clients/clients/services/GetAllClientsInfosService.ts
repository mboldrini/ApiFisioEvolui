import { ServicesTypesRepository } from './../../../services_types/typeorm/repositories/ServicesTypesRepository';
import { ClientRespiratoryEvalRepository } from '../../respiratory_evaluation/typeorm/repositories/RespiratoryEval';
import { ClientPhysicalEvalRepository } from '../../physical_evaluation/typeorm/repositories/PhysicalEval';
import { ClientObjectivesRepository } from '../../objectives_goals/typeorm/repositories/ClientObjectives';
import { ClientHPPRepository } from '../../hpp/typeorm/repositories/ClientHPP';
import { ClientHDARepository } from '../../hda/typeorm/repositories/ClientHDA';
import { ClientGuidelineRepository } from '../../guideline/typeorm/repositories/Guideline';
import { DiagnosticRepository } from '../../diagnostic/typeorm/repositories/Diagnostic';
import { ComplaintRepository } from '../../complaint/typeorm/repositories/Complaint';
import { ClientsRepository } from '../typeorm/repositories/ClientsRepository';
import { TIMEZONE_LANGUAGE, TIMEZONE_LOCALE } from '../../../../shared/DTO';
import { AppointmentsRepository } from '../../../appointments/typeorm/repositories/AppointmentsRepository';
import { UsersRepository } from '@modules/users/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository, Between } from 'typeorm';
import { startOfMonth, endOfMonth, format } from 'date-fns';
import ClientFunctionalDiagnosisRepository from '@modules/clients/funcionalDiagnosis/typeorm/repositories/FunctionalDiagnosis';

interface IRequest {
	user_code: string;
	client_id: number;
	date: string;
}

function GetDate(date: string, type: 'start' | 'end') {
	let dt = new Date(date);
	if (type === 'start') {
		return startOfMonth(dt);
	} else {
		return endOfMonth(dt);
	}
}

class GetAllClientsInfosService {
	public async execute({ user_code, client_id, date }: IRequest): Promise<Object> {
		const userRepo = getCustomRepository(UsersRepository);
		const clientsRepo = getCustomRepository(ClientsRepository);
		const complaintRepo = getCustomRepository(ComplaintRepository);
		const diagnosticRepo = getCustomRepository(DiagnosticRepository);
		const funcionalDiagRepo = getCustomRepository(ClientFunctionalDiagnosisRepository);
		const guidelineRepo = getCustomRepository(ClientGuidelineRepository);
		const hdaRepo = getCustomRepository(ClientHDARepository);
		const hppRepo = getCustomRepository(ClientHPPRepository);
		const objectivesRepo = getCustomRepository(ClientObjectivesRepository);
		const physicalEvalRepo = getCustomRepository(ClientPhysicalEvalRepository);
		const respiratoryEvalRepo = getCustomRepository(ClientRespiratoryEvalRepository);
		const appointmentRepo = getCustomRepository(AppointmentsRepository);
		const serviceTypeRepo = getCustomRepository(ServicesTypesRepository);

		const startDate = GetDate(date, 'start');
		const endDate = GetDate(date, 'end');

		const userExist = await userRepo.findOne({ user_code });
		if (!userExist) throw new AppError('Esse usuário não existe');

		const clientExist = await clientsRepo.findOne({ user_id: userExist?.user_id, id: client_id, enabled: true });
		if (!clientExist) throw new AppError('Esse cliente não existe!');

		const complaintList = await complaintRepo.findOrderBy({
			client_id: clientExist.id,
			user_id: userExist.user_id,
		});

		const diagnosticList = await diagnosticRepo.findOrderBy({
			client_id: clientExist.id,
			user_id: userExist.user_id,
		});

		const funcionalList = await funcionalDiagRepo.findOrderBy({
			client_id: clientExist.id,
			user_id: userExist.user_id,
		});

		const guidelineList = await guidelineRepo.findOrderBy({
			client_id: clientExist.id,
			user_id: userExist.user_id,
		});

		const hdaList = await hdaRepo.findOrderBy({
			client_id: clientExist.id,
			user_id: userExist.user_id,
		});

		const hppList = await hppRepo.findOrderBy({
			client_id: clientExist.id,
			user_id: userExist.user_id,
		});

		const objectivesList = await objectivesRepo.findOrderBy({
			client_id: clientExist.id,
			user_id: userExist.user_id,
		});

		const physicalList = await physicalEvalRepo.findOrderBy({
			client_id: clientExist.id,
			user_id: userExist.user_id,
		});

		const respiratoryList = await respiratoryEvalRepo.findOrderBy({
			client_id: clientExist.id,
			user_id: userExist.user_id,
		});

		const servicesTypesList = await serviceTypeRepo.find({
			user_id: userExist.user_id,
		});

		const appointmentList = await appointmentRepo.find({
			client_id: clientExist.id,
			date_scheduled: date,
		});

		let newAppointmentList = appointmentList.map(appointment => ({
			id: appointment.id,
			status: appointment.status,
			type: appointment.type,
			date_scheduled: appointment.date_scheduled,
			start_hour: appointment.start_hour,
			end_hour: appointment.end_hour,
			duration: appointment.duration,
			client_id: appointment.client_id,
			serviceType_id: appointment.serviceType_id,
			serviceType_name: servicesTypesList
				.filter(service => {
					if (service.id == appointment.serviceType_id) return service.description;
				})
				.map(service => {
					return service.description;
				})[0],
		}));

		const infos = {
			complaints: complaintList,
			diagnostic: diagnosticList,
			functional: funcionalList,
			guideline: guidelineList,
			hda: hdaList,
			hpp: hppList,
			objectives: objectivesList,
			physical: physicalList,
			respiratory: respiratoryList,
			appointment: newAppointmentList,
		};

		return infos;
	}
}

export default GetAllClientsInfosService;
