import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import AgendaController from '../controllers/AgendaController';

const agendaRouter = Router();
const agendaControler = new AgendaController();

agendaRouter.post(
	'/',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			dataInicio: Joi.date().required(),
			dataFim: Joi.date().required(),
		},
	}),
	agendaControler.show,
);

export default agendaRouter;
