import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import PacienteAgendaController from '../controllers/PacienteAgendaController';

const pacienteAgendaRouter = Router();
const pacienteAgendaController = new PacienteAgendaController();

// pacienteRouter.get('/', isAuthenticated, pacienteController.show);

pacienteAgendaRouter.put(
	'/',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			dia_semana: Joi.number().required(),
			data_agendamento: Joi.date().required(),
			horario: Joi.number().required(),
			recorrente: Joi.number().required(),
			limite_recorrencia: Joi.number().required(),
			data_limite: Joi.date().optional(),
			paciente_id: Joi.number().required(),
		},
	}),
	pacienteAgendaController.update,
);

pacienteAgendaRouter.delete(
	'/',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			id: Joi.optional().required(),
		},
	}),
	pacienteAgendaController.delete,
);

export default pacienteAgendaRouter;
