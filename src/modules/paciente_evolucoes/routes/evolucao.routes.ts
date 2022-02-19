import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import EvolucaoController from '../controllers/EvolucaoController';

const evolucaoRouter = Router();
const evolucaoController = new EvolucaoController();

evolucaoRouter.post(
	'/',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			evolucao: Joi.string().required(),
			observacoes: Joi.string().optional(),
			status: Joi.number().required(),
			tipo: Joi.number().optional(),
			agendamento_id: Joi.number().required(),
			paciente_id: Joi.number().required(),
		},
	}),
	evolucaoController.create,
);

evolucaoRouter.put(
	'/',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			id: Joi.number().required(),
			evolucao: Joi.string().required(),
			observacoes: Joi.string().optional(),
			status: Joi.number().required(),
			tipo: Joi.number().optional(),
			agendamento_id: Joi.number().required(),
			paciente_id: Joi.number().required(),
		},
	}),
	evolucaoController.update,
);

evolucaoRouter.delete(
	'/',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			id: Joi.number().required(),
			agendamento_id: Joi.number().required(),
			paciente_id: Joi.number().required(),
		},
	}),
	evolucaoController.delete,
);

evolucaoRouter.post(
	'/show',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			agendamento_id: Joi.number().required(),
			paciente_id: Joi.number().required(),
		},
	}),
	evolucaoController.show,
);

evolucaoRouter.get(
	'/all/:paciente_id',
	isAuthenticated,
	// celebrate({
	// 	[Segments.BODY]: {
	// 		paciente_id: Joi.number().required(),
	// 	},
	// }),
	evolucaoController.showAll,
);

export default evolucaoRouter;
