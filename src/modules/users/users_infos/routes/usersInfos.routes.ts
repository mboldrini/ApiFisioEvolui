import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import UsersInfosController from '../controllers/UsersInfosController';

const usersInfosRouter = Router();
const usersInfosController = new UsersInfosController();

usersInfosRouter.post(
	'/',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			description: Joi.string().optional(),
			professional_mail: Joi.string().optional(),
			celphone: Joi.string().optional(),
			second_celphone: Joi.string().optional(),
			website: Joi.string().optional(),
			instagram: Joi.string().optional(),
			twitter: Joi.string().optional(),
			tiktok: Joi.string().optional(),
		},
	}),
	usersInfosController.create,
);

usersInfosRouter.put(
	'/',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			description: Joi.string().required(),
			professional_mail: Joi.string().required(),
			celphone: Joi.string().required(),
			second_celphone: Joi.string().required(),
			website: Joi.string().required(),
			instagram: Joi.string().required(),
			twitter: Joi.string().required(),
			tiktok: Joi.string().required(),
		},
	}),
	usersInfosController.update,
);

usersInfosRouter.get('/', isAuthenticated, usersInfosController.get);

export default usersInfosRouter;
