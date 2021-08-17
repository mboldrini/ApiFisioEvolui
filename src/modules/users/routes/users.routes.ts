import { Router } from 'express';
import UsersController from '../controllers/UserController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/', isAuthenticated, usersController.show);

usersRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			uid: Joi.string(),
			nome: Joi.string().required(),
			email: Joi.string().email().required(),
			celular: Joi.string().required(),
			instagram: Joi.string().optional(),
			crefito: Joi.string().required(),
			dtNascimento: Joi.date().required(),
			cpfcnpj: Joi.string().required(),
			excluido: Joi.number().optional(),
			params: Joi.object().optional(),
		},
	}),
	usersController.create,
);

usersRouter.put('/:uid', usersController.update);

export default usersRouter;
