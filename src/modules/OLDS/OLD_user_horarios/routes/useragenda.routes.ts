import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import UserAgendaController from '../controllers/UserAgendaController';

const userAgendaRouter = Router();
const userAgendaController = new UserAgendaController();

userAgendaRouter.get('/', isAuthenticated, userAgendaController.show);

// também não pode cadastrar direto
// userAgendaRouter.post('/', isAuthenticated, userAgendaController.create);

userAgendaRouter.put(
	'/',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			horario_inicio: Joi.number().required(),
			horario_fim: Joi.number().required(),
			dia_semana: Joi.number().required(),
		},
	}),
	userAgendaController.update,
);

export default userAgendaRouter;
