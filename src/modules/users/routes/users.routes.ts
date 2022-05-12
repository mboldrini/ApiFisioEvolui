import { Router } from 'express';
import UsersController from '../controllers/UserController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/', isAuthenticated, usersController.show);

usersRouter.get('/profilestatistics', isAuthenticated, usersController.showProfileStatistics);

usersRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			family_name: Joi.string().required(),
			given_name: Joi.string().required(),
			id: Joi.string().required(),
			name: Joi.string().required(),
			email: Joi.string().email().required(),
			picture: Joi.string().required(),
			crefito: Joi.string().required(),
			celular: Joi.string().required(),
		},
	}),
	usersController.create,
);

usersRouter.put(
	'/',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			crefito: Joi.string().required(),
			celular: Joi.string().required(),
		},
	}),
	usersController.update,
);

export default usersRouter;
