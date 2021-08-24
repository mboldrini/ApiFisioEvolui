import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UserConfigsController from '../controllers/UserConfigsController';

const userConfigsRouter = Router();
const userConfigsController = new UserConfigsController();

userConfigsRouter.get('/', isAuthenticated, userConfigsController.show);

userConfigsRouter.post(
	'/',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			atendimento_duracao: Joi.string().required(),
			agenda_retroativo: Joi.number().required(),
			evolucao_repetir: Joi.number().required(),
			pagamento_valor: Joi.string().required(),
		},
	}),
	userConfigsController.update,
);

export default userConfigsRouter;
