import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import TipoAtendimentoController from '../controllers/TipoAtendimentoController';

const tipoAtendimentoRouter = Router();
const tipoAtendimentoController = new TipoAtendimentoController();

//tipoAtendimentoRouter.get('/', isAuthenticated, tipoAtendimentoController.show);

tipoAtendimentoRouter.get(
	'/',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			id: Joi.number().required(),
		},
	}),
	tipoAtendimentoController.show,
);

tipoAtendimentoRouter.get('/all', isAuthenticated, tipoAtendimentoController.showall);

tipoAtendimentoRouter.post(
	'/',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			tipo: Joi.string().required(),
			valor_atendimento: Joi.number().required(),
			descricao: Joi.string().optional(),
		},
	}),
	tipoAtendimentoController.create,
);

tipoAtendimentoRouter.put(
	'/',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			id_tipo: Joi.number().required(),
			tipo: Joi.string().required(),
			valor_atendimento: Joi.number().required(),
			descricao: Joi.string().optional(),
		},
	}),
	tipoAtendimentoController.update,
);

tipoAtendimentoRouter.delete('/:id', isAuthenticated, tipoAtendimentoController.delete);

export default tipoAtendimentoRouter;
