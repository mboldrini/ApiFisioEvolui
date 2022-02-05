import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import AgendamentoController from '../controllers/AgendamentoController';

const agendamentoRouter = Router();
const agendamentoControler = new AgendamentoController();

agendamentoRouter.post(
	'/',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			// dataHora: Joi.date().required(),
			// tipo: Joi.number().required(),
			// status: Joi.number().required(),
			paciente_id: Joi.number().required(),
			agendamentos: Joi.array()
				.items({
					dataHora: Joi.string().required(),
					tipo: Joi.number().required(),
					status: Joi.number().required(),
				})
				.required(),
		},
	}),
	agendamentoControler.create,
);

agendamentoRouter.get(
	'/',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			id: Joi.number().required(),
		},
	}),
	agendamentoControler.show,
);

agendamentoRouter.put(
	'/',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			id: Joi.number().required(),
			dataHora: Joi.string().required(),
			tipo: Joi.number().required(),
			status: Joi.number().required(),
			paciente_id: Joi.number().required(),
		},
	}),
	agendamentoControler.update,
);

export default agendamentoRouter;
