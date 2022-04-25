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
			paciente_id: Joi.number().required(),
			agendamentos: Joi.array()
				.items({
					//dataHora: Joi.string().required(),
					tipo: Joi.number().required(),
					status: Joi.number().required(),
					data: Joi.string().required(),
					hora: Joi.number().required(),
				})
				.required(),
		},
	}),
	agendamentoControler.create,
);

agendamentoRouter.get(
	'/:id',
	isAuthenticated,
	// celebrate({
	// 	[Segments.BODY]: {
	// 		id: Joi.number().required(),
	// 	},
	// }),
	agendamentoControler.show,
);

agendamentoRouter.post(
	'/all',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			dataInicio: Joi.date().required(),
			dataFim: Joi.date().required(),
			paciente_id: Joi.number().required(),
		},
	}),
	agendamentoControler.showAll,
);

agendamentoRouter.post(
	'/allhoursday',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			dataInicio: Joi.date().required(),
			dataFim: Joi.date().required(),
		},
	}),
	agendamentoControler.showAllHoursDay,
);

agendamentoRouter.put(
	'/',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			id: Joi.number().required(),
			dataHora: Joi.string().required(),
			data: Joi.date().required(),
			tipo: Joi.number().required(),
			status: Joi.number().required(),
			paciente_id: Joi.number().required(),
		},
	}),
	agendamentoControler.update,
);

agendamentoRouter.delete(
	'/',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			id: Joi.number().required(),
			paciente_id: Joi.number().required(),
		},
	}),
	agendamentoControler.delete,
);

agendamentoRouter.delete(
	'/all/:paciente_id',
	isAuthenticated,
	// celebrate({
	// 	[Segments.BODY]: {
	// 		paciente_id: Joi.number().required(),
	// 	},
	// }),
	agendamentoControler.deleteAll,
);

export default agendamentoRouter;
