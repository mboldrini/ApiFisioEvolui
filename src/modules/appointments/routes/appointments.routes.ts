import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.post(
	'/',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			client_id: Joi.number().required(),
			serviceType_id: Joi.number().required(),
			description: Joi.string().optional(),
			comments: Joi.string().optional(),
			status: Joi.number().required(),
			type: Joi.number().required(),
			date_scheduled: Joi.string().required(),
			start_hour: Joi.string().required(),
		},
	}),
	appointmentsController.create,
);

appointmentsRouter.get('/:id&:client_id', isAuthenticated, appointmentsController.getAppointment);

appointmentsRouter.patch(
	'/:id',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			client_id: Joi.number().required(),
			serviceType_id: Joi.number().required(),
			description: Joi.string().optional(),
			comments: Joi.string().optional(),
			status: Joi.number().required(),
			type: Joi.number().required(),
			date_scheduled: Joi.string().required(),
			start_hour: Joi.string().required(),
		},
	}),
	appointmentsController.update,
);

appointmentsRouter.post(
	'/availability',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			// client_id: Joi.number().required(),
			serviceType_id: Joi.number().required(),
			date_scheduled: Joi.string().required(),
			start_hour: Joi.string().required(),
		},
	}),
	appointmentsController.getAvailability,
);

appointmentsRouter.post(
	'/day',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			date: Joi.date().required(),
		},
	}),
	appointmentsController.getAllDayAppointments,
);

appointmentsRouter.patch('/cancel/:id', isAuthenticated, appointmentsController.cancelAppointment);

appointmentsRouter.delete('/delete/:id', isAuthenticated, appointmentsController.deleteAppointment);

appointmentsRouter.get('/month/:client_id&:date', isAuthenticated, appointmentsController.getAllMonthAppointments);

export default appointmentsRouter;
