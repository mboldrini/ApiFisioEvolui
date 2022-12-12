import ServicePaymentRepository from '@modules/service_payment/typeorm/repositories/ServicePaymentRepository';
import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import CancelAppointmentService from '../services/CancelAppointmentService';
import CreateAppointmentService from '../services/CreateAppointmentService';
import DeleteAppointmentService from '../services/DeleteAppointmentService';
import GetAllDayAppoinntmentsService from '../services/GetAllDayAppoinntmentsService';
import GetAppointmentAvailabilityService from '../services/GetAppointmentAvailabilityService';
import UpdateAppointmentService from '../services/UpdateAppointmentService';
import { startOfMonth, endOfMonth } from 'date-fns';
import GetAllMonthAppoinntmentsService from '../services/GetAllMonthAppointmentsService';
import GetAppointmentService from '../services/GetAppointmentService';
import CreateRecurrentAppointmentService from '../services/CreateRecurrentDayWeekAppointmentService';
import CreateRecurrentDayWeekAppointmentService from '../services/CreateRecurrentDayWeekAppointmentService';

export default class AppointmentsController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { client_id, serviceType_id, description, comments, status, type, date_scheduled, start_hour } =
			request.body;
		const { user_code } = request.user;

		const appointmentSrvc = new CreateAppointmentService();
		const appointment = await appointmentSrvc.execute({
			user_code,
			serviceType_id,
			client_id,
			description,
			comments,
			status,
			type,
			date_scheduled,
			start_hour,
		});

		return response.json(appointment);
	}

	public async createRecurrentDayWeek(request: Request, response: Response): Promise<Response> {
		const { client_id, serviceType_id, status, type, date_scheduled, start_hour, recurrent, final_date } =
			request.body;
		const { user_code } = request.user;

		const appointmentSrvc = new CreateRecurrentDayWeekAppointmentService();
		const appointment = await appointmentSrvc.execute({
			user_code,
			serviceType_id,
			client_id,
			status,
			type,
			date_scheduled,
			start_hour,
			recurrent,
			final_date,
		});

		return response.json(appointment);
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const { client_id, serviceType_id, description, comments, status, type, date_scheduled, start_hour } =
			request.body;
		const { user_code } = request.user;
		const { id } = request.params;

		const appointment_id = parseInt(id);

		const appointmentSrvc = new UpdateAppointmentService();
		const appointment = await appointmentSrvc.execute({
			id: appointment_id,
			user_code,
			serviceType_id,
			client_id,
			description,
			comments,
			status,
			type,
			date_scheduled,
			start_hour,
		});

		return response.json(appointment);
	}

	public async getAppointment(request: Request, response: Response): Promise<Response> {
		const { id, client_id } = request.params;
		const { user_code } = request.user;

		const appointmentSrvc = new GetAppointmentService();
		const appointment = await appointmentSrvc.execute({
			id: parseInt(id),
			client_id: parseInt(client_id),
			user_code,
		});

		return response.json(appointment);
	}

	public async getAvailability(request: Request, response: Response): Promise<Response> {
		const { client_id, serviceType_id, date_scheduled, start_hour } = request.body;
		const { user_code } = request.user;

		const appointmentSrvc = new GetAppointmentAvailabilityService();
		const appointment = await appointmentSrvc.execute({
			user_code,
			serviceType_id,
			client_id,
			date_scheduled,
			start_hour,
		});

		return response.json(appointment);
	}

	public async cancelAppointment(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		const { user_code } = request.user;

		const appointment_id = parseInt(id);

		const appointmentSrvc = new CancelAppointmentService();
		const appointment = await appointmentSrvc.execute({
			user_code,
			appointment_id,
		});

		return response.json(appointment);
	}

	public async deleteAppointment(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		const { user_code } = request.user;

		const appointment_id = parseInt(id);

		const appointmentSrvc = new DeleteAppointmentService();
		const appointment = await appointmentSrvc.execute({
			user_code,
			appointment_id,
		});

		return response.json(appointment);
	}

	public async getAllDayAppointments(request: Request, response: Response): Promise<Response> {
		const { date } = request.body;
		const { user_code } = request.user;

		const appointmentSrvc = new GetAllDayAppoinntmentsService();
		const appointment = await appointmentSrvc.execute({
			user_code,
			date_scheduled: date,
		});

		return response.json(appointment);
	}

	public async getAllMonthAppointments(request: Request, response: Response): Promise<Response> {
		const { client_id, date } = request.params;
		const { user_code } = request.user;

		const appointmentSrvc = new GetAllMonthAppoinntmentsService();
		const appointment = await appointmentSrvc.execute({
			client_id: parseInt(client_id),
			user_code,
			date,
		});

		return response.json(appointment);
	}
}
