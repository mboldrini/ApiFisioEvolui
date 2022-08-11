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
import Diagnostic from '@modules/clients/diagnostic/typeorm/entities/Diagnostic';
import Complaint from '@modules/clients/complaint/typeorm/entities/Complaint';
import ClientFunctionalDiagnosis from '@modules/clients/funcionalDiagnosis/typeorm/entities/FuncionalDiagnosis';
import ClientGuideline from '@modules/clients/guideline/typeorm/entities/Guideline';
import ClientHDA from '@modules/clients/hda/typeorm/entities/ClientHDA';
import ClientHPP from '@modules/clients/hpp/typeorm/entities/ClientHPP';
import ClientObjectives from '@modules/clients/objectives_goals/typeorm/entities/ClientObjectives';
import ClientPhysicalEval from '@modules/clients/physical_evaluation/typeorm/entities/PhysicalEvaluation';
import ClientRespiratoryEval from '@modules/clients/respiratory_evaluation/typeorm/entities/RespiratoryEvatuation';
import Appointments from '@modules/appointments/typeorm/entities/Appointments';

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

		/// Reclamações
		const complaintList = await complaintRepo.findOrderBy({
			client_id: clientExist.id,
			user_id: userExist.user_id,
		});
		const newComplaintList = complaintList.map((compl: Complaint) => ({
			id: compl.id,
			about: compl.complaint,
			comments: compl.comments,
			date: compl.date,
			client_id: compl.client_id,
			created_at: compl.created_at,
			updated_at: compl.updated_at,
		}));

		/// Diagnóstico Inicial
		const diagnosticList = await diagnosticRepo.findOrderBy({
			client_id: clientExist.id,
			user_id: userExist.user_id,
		});
		const newDiagnosticList = diagnosticList.map((diagnostic: Diagnostic) => ({
			id: diagnostic.id,
			about: diagnostic.diagnostic,
			comments: diagnostic.comments,
			date: diagnostic.date,
			client_id: diagnostic.client_id,
			created_at: diagnostic.created_at,
			updated_at: diagnostic.updated_at,
		}));

		/// Diagnostico Funcional
		const funcionalList = await funcionalDiagRepo.findOrderBy({
			client_id: clientExist.id,
			user_id: userExist.user_id,
		});
		const newFuncionalList = funcionalList.map((funcional: ClientFunctionalDiagnosis) => ({
			id: funcional.id,
			about: funcional.diagnosis,
			comments: funcional.comments,
			date: funcional.date,
			client_id: funcional.client_id,
			created_at: funcional.created_at,
			updated_at: funcional.updated_at,
		}));

		/// Observações
		const guidelineList = await guidelineRepo.findOrderBy({
			client_id: clientExist.id,
			user_id: userExist.user_id,
		});
		const newGuidelineList = guidelineList.map((guideline: ClientGuideline) => ({
			id: guideline.id,
			about: guideline.guideline,
			comments: guideline.comments,
			date: guideline.date,
			client_id: guideline.client_id,
			created_at: guideline.created_at,
			updated_at: guideline.updated_at,
		}));

		/// HDA - Histórico de Doença Atual
		const hdaList = await hdaRepo.findOrderBy({
			client_id: clientExist.id,
			user_id: userExist.user_id,
		});
		const newHdaList = hdaList.map((hda: ClientHDA) => ({
			id: hda.id,
			about: hda.hda,
			comments: hda.comments,
			date: hda.date,
			client_id: hda.client_id,
			created_at: hda.created_at,
			updated_at: hda.updated_at,
		}));

		/// HPP - Histórico de Doença Pregressa
		const hppList = await hppRepo.findOrderBy({
			client_id: clientExist.id,
			user_id: userExist.user_id,
		});
		const newHppList = hppList.map((hppList: ClientHPP) => ({
			id: hppList.id,
			about: hppList.hpp,
			comments: hppList.comments,
			date: hppList.date,
			client_id: hppList.client_id,
			created_at: hppList.created_at,
			updated_at: hppList.updated_at,
		}));

		/// Objetivos e metas
		const objectivesList = await objectivesRepo.findOrderBy({
			client_id: clientExist.id,
			user_id: userExist.user_id,
		});
		const newObjectivesList = objectivesList.map((objectivesList: ClientObjectives) => ({
			id: objectivesList.id,
			about: objectivesList.objectives,
			comments: objectivesList.comments,
			date: objectivesList.date,
			client_id: objectivesList.client_id,
			created_at: objectivesList.created_at,
			updated_at: objectivesList.updated_at,
		}));

		/// Avaliação Física
		const physicalList = await physicalEvalRepo.findOrderBy({
			client_id: clientExist.id,
			user_id: userExist.user_id,
		});
		const newPhysicalList = physicalList.map((physical: ClientPhysicalEval) => ({
			id: physical.id,
			about: physical.evaluation,
			comments: physical.comments,
			date: physical.date,
			client_id: physical.client_id,
			created_at: physical.created_at,
			updated_at: physical.updated_at,
		}));

		/// Avaliação Respiratória
		const respiratoryList = await respiratoryEvalRepo.findOrderBy({
			client_id: clientExist.id,
			user_id: userExist.user_id,
		});
		const newRespiratoryList = respiratoryList.map((respiratory: ClientRespiratoryEval) => ({
			id: respiratory.id,
			about: respiratory.evaluation,
			comments: respiratory.comments,
			date: respiratory.date,
			client_id: respiratory.client_id,
			created_at: respiratory.created_at,
			updated_at: respiratory.updated_at,
		}));

		const servicesTypesList = await serviceTypeRepo.find({
			user_id: userExist.user_id,
		});

		const appointmentList = await appointmentRepo.findOrderBy({
			client_id: clientExist.id,
			user_id: userExist.user_id,
			start_date: startDate,
			end_date: endDate,
		});

		let newAppointmentList = appointmentList.map((appointment: Appointments) => ({
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
			clinicalDiagnostic: newDiagnosticList,
			complaints: newComplaintList,
			hda: newHdaList,
			hpp: newHppList,
			physicalEvaluation: newPhysicalList,
			respiratoryEvaluation: newRespiratoryList,
			functionalDiagnostic: newFuncionalList,
			objectives: newObjectivesList,
			evolution: 'PRECISO DESENVOLVER',
			guideline: newGuidelineList,
			appointment: newAppointmentList,
		};

		return infos;
	}
}

export default GetAllClientsInfosService;
