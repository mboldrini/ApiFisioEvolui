import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UserConfigsController from '../controllers/UserConfigsController';

const userConfigsRouter = Router();
const userConfigsController = new UserConfigsController();

userConfigsRouter.post(
	'/',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			hora_inicioAtendimento: Joi.number().optional(),
			hora_fimAtendimento: Joi.number().optional(),
			tempo_atendimento: Joi.number().optional(),
			ignorar_tempoDeslocamento: Joi.boolean().optional(),
			tempo_deslocamento: Joi.number().optional(),
			data_retroativa: Joi.boolean().optional(),
			notificacoes: Joi.boolean().optional(),
		},
	}),
	userConfigsController.create,
);

userConfigsRouter.patch(
	'/',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			hora_inicioAtendimento: Joi.number().required(),
			hora_fimAtendimento: Joi.number().required(),
			tempo_atendimento: Joi.number().required(),
			ignorar_tempoDeslocamento: Joi.boolean().required(),
			tempo_deslocamento: Joi.number().required(),
			data_retroativa: Joi.boolean().required(),
			notificacoes: Joi.boolean().required(),
		},
	}),
	userConfigsController.update,
);

userConfigsRouter.get('/', isAuthenticated, userConfigsController.show);

export default userConfigsRouter;
