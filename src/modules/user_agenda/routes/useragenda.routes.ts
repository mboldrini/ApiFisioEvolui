import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import UserAgendaController from '../controllers/UserAgendaController';

const userAgendaRouter = Router();
const userAgendaController = new UserAgendaController();

userAgendaRouter.post(
	'/',
	isAuthenticated,
	// celebrate({
	// 	[Segments.BODY]: {
	// 		uid: Joi.string(),
	// 		nome: Joi.string().required(),
	// 		email: Joi.string().email().required(),
	// 		celular: Joi.string().required(),
	// 		instagram: Joi.string().optional(),
	// 		crefito: Joi.string().required(),
	// 		dtNascimento: Joi.date().required(),
	// 		cpfcnpj: Joi.string().required(),
	// 		excluido: Joi.number().optional(),
	// 		configs: Joi.object().optional(),
	// 		agenda: Joi.array().optional(),
	// 	},
	// }),
	userAgendaController.create,
);

export default userAgendaRouter;
