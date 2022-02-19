import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import PacienteController from '../controllers/PacienteController';

const pacienteRouter = Router();
const pacienteController = new PacienteController();

pacienteRouter.post(
	'/',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			nome: Joi.string().required(),
			cpf: Joi.string().required(),
			dataNascimento: Joi.date().optional(),
			celular: Joi.string().required(),
			telefoneRecado: Joi.string().optional(),
			email: Joi.string().optional(),
			tipoAtendimento: Joi.number().required(),
			temComorbidade: Joi.bool().required(),
			logradouro: Joi.string().optional(),
			uf: Joi.number().required(),
			bairro: Joi.string().optional(),
			numero: Joi.string().optional(),
			referencia: Joi.string().optional(),
			queixamotivo: Joi.string().optional().max(2490),
			diagnosticos: Joi.string().optional().max(2490),
			comorbidades: Joi.string().optional().max(2490),
			agendamentos: Joi.array()
				.items({
					data: Joi.string().required(),
					hora: Joi.number().required(),
					tipo: Joi.number().required(),
					status: Joi.number().required(),
				})
				.optional(),
		},
	}),
	pacienteController.create,
);

pacienteRouter.get(
	'/:id',
	isAuthenticated,
	// celebrate({
	// 	[Segments.BODY]: {
	// 		id: Joi.number().required(),
	// 	},
	// }),
	pacienteController.show,
);

pacienteRouter.put(
	'/',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			id: Joi.number().required(),
			nome: Joi.string().required(),
			cpf: Joi.string().required(),
			dataNascimento: Joi.date().required(),
			celular: Joi.string().required(),
			telefoneRecado: Joi.string().required(),
			email: Joi.string().required(),
			tipoAtendimento: Joi.number().required(),
			temComorbidade: Joi.bool().required(),
			logradouro: Joi.string().required(),
			uf: Joi.number().required(),
			bairro: Joi.string().required(),
			numero: Joi.string().required(),
			referencia: Joi.string().required(),
			queixamotivo: Joi.string().optional().max(2490),
			diagnosticos: Joi.string().optional().max(2490),
			comorbidades: Joi.string().optional().max(2490),
		},
	}),
	pacienteController.update,
);

pacienteRouter.get('/all', isAuthenticated, pacienteController.showAll);

pacienteRouter.delete(
	'/',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			id: Joi.number().required(),
		},
	}),
	pacienteController.delete,
);

export default pacienteRouter;
