import CreateMutipleAppointmentService from '@modules/appointments/services/CreateMultipleAppointmentService copy';
import CreateComplaintService from '@modules/clients/complaint/services/CreateComplaintService';
import CreateDiagnosticService from '@modules/clients/diagnostic/services/CreateDiagnosticService';
import CreateFunctionalDiagnosisService from '@modules/clients/funcionalDiagnosis/services/CreateFunctionalDiagnosisService';
import CreateGuidelineService from '@modules/clients/guideline/services/CreateGuidelineService';
import CreateClientHDAService from '@modules/clients/hda/services/CreateHDAService';
import CreateClientHPPService from '@modules/clients/hpp/services/CreateHPPService';
import CreateClientObjectiveService from '@modules/clients/objectives_goals/services/CreateObjectiveService';
import CreateClientPhysicalEvalService from '@modules/clients/physical_evaluation/services/CreatePhysicalEvalService';
import CreateClientRespiratoryEvalService from '@modules/clients/respiratory_evaluation/services/CreateRespiratoryEvalService';
import { Request, Response } from 'express';
import CreateClientService from '../services/CreateClientService';
import DeleteClientService from '../services/DeleteClientService';
import GetAllClientsService from '../services/GetAllClientsService';
import GetClientService from '../services/GetClientService.ts';
import UpdateClientService from '../services/UpdateClientService';

interface IDiagnostic {
	diagnostic: string;
	date: Date;
}
interface IComplaint {
	complaint: string;
	date: Date;
}
interface IHda {
	hda: string;
	date: Date;
}
interface IHpp {
	hpp: string;
	date: Date;
}
interface IFunctDiagnosis {
	diagnostic: string;
	date: Date;
}
interface IPhysicalEval {
	evaluation: string;
	date: Date;
}
interface IRespiratoryEval {
	evaluation: string;
	date: Date;
}
interface IObjectives {
	objective: string;
	date: Date;
}
interface IGuideline {
	guideline: string;
	date: Date;
}
interface IAppointment {
	type: number;
	date_scheduled: string;
	start_hour: string;
}

interface IParams {
	name: string;
	dataNascimento: Date;
	document: string;
	email: string;
	celphone: string;
	second_celphone: string;
	instagram?: string;
	address: string;
	serviceType_id: number;
	latitude?: string;
	longitude?: string;
	diagnostic?: IDiagnostic;
	complaint?: IComplaint;
	hda?: IHda;
	hpp?: IHpp;
	funcionalDiagnosis?: IFunctDiagnosis;
	physicalEval?: IPhysicalEval;
	respiratoryEval?: IRespiratoryEval;
	objective?: IObjectives;
	guideline?: IGuideline;
	appointment?: IAppointment[];
}

export default class ClientsController {
	public async create(request: Request, response: Response): Promise<Response> {
		const {
			name,
			dataNascimento,
			document,
			email,
			celphone,
			second_celphone,
			instagram,
			address,
			serviceType_id,
			latitude,
			longitude,
			diagnostic,
			complaint,
			hda,
			hpp,
			funcionalDiagnosis,
			physicalEval,
			respiratoryEval,
			objective,
			guideline,
			appointment,
		}: IParams = request.body;
		const { user_code } = request.user;

		const createClient = new CreateClientService();
		const newClient = await createClient.execute({
			user_code,
			name,
			dataNascimento,
			document,
			email,
			celphone,
			second_celphone,
			instagram,
			serviceType_id,
			address,
			latitude,
			longitude,
		});

		let newDiagnosis;
		if (diagnostic) {
			const createDiagnosis = new CreateDiagnosticService();
			newDiagnosis = await createDiagnosis.execute({
				diagnostic: diagnostic.diagnostic,
				comments: '',
				date: diagnostic.date,
				client_id: newClient.id,
				user_code: user_code,
			});
		}

		let newComplaint;
		if (complaint) {
			const createComplaint = new CreateComplaintService();
			newComplaint = await createComplaint.execute({
				complaint: complaint.complaint,
				date: complaint.date,
				comments: '',
				client_id: newClient.id,
				user_code: user_code,
			});
		}

		let newHda;
		if (hda) {
			const createHda = new CreateClientHDAService();
			newHda = await createHda.execute({
				hda: hda.hda,
				date: hda.date,
				comments: '',
				client_id: newClient.id,
				user_code: user_code,
			});
		}

		let newHpp;
		if (hpp) {
			const createHpp = new CreateClientHPPService();
			newHpp = await createHpp.execute({
				hpp: hpp.hpp,
				date: hpp.date,
				comments: '',
				client_id: newClient.id,
				user_code: user_code,
			});
		}

		let newFunctDiagnosis;
		if (funcionalDiagnosis) {
			const createFuncDiagnos = new CreateFunctionalDiagnosisService();
			newFunctDiagnosis = await createFuncDiagnos.execute({
				diagnostic: funcionalDiagnosis.diagnostic,
				date: funcionalDiagnosis.date,
				comments: '',
				client_id: newClient.id,
				user_code: user_code,
			});
		}

		let newPhysicalEval;
		if (physicalEval) {
			const createPhysicalEval = new CreateClientPhysicalEvalService();
			newPhysicalEval = await createPhysicalEval.execute({
				evaluation: physicalEval.evaluation,
				date: physicalEval.date,
				comments: '',
				client_id: newClient.id,
				user_code: user_code,
			});
			console.log(newPhysicalEval);
		}

		let newRespiratoryEval;
		if (respiratoryEval) {
			const createRespiratoryEval = new CreateClientRespiratoryEvalService();
			newRespiratoryEval = await createRespiratoryEval.execute({
				evaluation: respiratoryEval.evaluation,
				date: respiratoryEval.date,
				comments: '',
				client_id: newClient.id,
				user_code: user_code,
			});
		}

		let newObjective;
		if (objective) {
			const createObjective = new CreateClientObjectiveService();
			newObjective = await createObjective.execute({
				objectives: objective.objective,
				date: objective.date,
				comments: '',
				client_id: newClient.id,
				user_code: user_code,
			});
		}

		let newGuideline;
		if (guideline) {
			const createGuideline = new CreateGuidelineService();
			newGuideline = await createGuideline.execute({
				guideline: guideline.guideline,
				date: guideline.date,
				comments: '',
				client_id: newClient.id,
				user_code: user_code,
			});
		}

		let newAppointments;
		if (appointment) {
			const createAppointment = new CreateMutipleAppointmentService();
			newAppointments = await createAppointment.execute({
				user_code: user_code,
				client_id: newClient.id,
				serviceType_id: serviceType_id,
				appointments: appointment,
			});
		}

		const retorno = {
			client: newClient,
			diagnostic: newDiagnosis,
			complaint: newComplaint,
			hda: newHda,
			hpp: newHpp,
			functionalDiagnosis: newFunctDiagnosis,
			physicalEval: newPhysicalEval,
			respiratoryEval: newRespiratoryEval,
			objective: newObjective,
			guideline: newGuideline,
			appointment: newAppointments,
		};

		return response.json(retorno);
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const {
			name,
			dataNascimento,
			document,
			email,
			celphone,
			second_celphone,
			instagram,
			serviceType_id,
			address,
			latitude,
			longitude,
		} = request.body;
		const { id } = request.params;
		const { user_code } = request.user;

		const client_id = parseInt(id);

		const updateClient = new UpdateClientService();
		const updatedClient = await updateClient.execute({
			id: client_id,
			user_code,
			name,
			dataNascimento,
			document,
			email,
			celphone,
			second_celphone,
			instagram,
			serviceType_id,
			address,
			latitude,
			longitude,
		});

		return response.json({ messsage: 'ok' });
	}

	public async get(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		const { user_code } = request.user;

		const client_id = parseInt(id);

		const getclient = new GetClientService();
		const client = await getclient.execute({
			id: client_id,
			user_code,
		});

		return response.json(client);
	}

	public async getAll(request: Request, response: Response): Promise<Response> {
		const { user_code } = request.user;

		const getclient = new GetAllClientsService();
		const clientList = await getclient.execute({
			user_code,
		});

		return response.json(clientList);
	}

	public async delete(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		const { user_code } = request.user;

		const client_id = parseInt(id);

		const getclient = new DeleteClientService();
		const client = await getclient.execute({
			id: client_id,
			user_code,
		});

		return response.json({ message: 'ok' });
	}
}
