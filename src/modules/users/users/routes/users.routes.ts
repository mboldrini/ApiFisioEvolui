import { Router } from 'express';
import UsersController from '../controllers/UserController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/', isAuthenticated, usersController.show);

usersRouter.post(
	'/exist',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			magic_code: Joi.string().optional(),
			user_code: Joi.string().required(),
			email: Joi.string().email().required(),
		},
	}),
	usersController.exist,
);

usersRouter.post(
	'/',
	// celebrate({
	// 	[Segments.BODY]: {
	// 		magic_code: Joi.string().optional(),
	// 		user_code: Joi.string().required(),
	// 		name: Joi.string().required(),
	// 		family_name: Joi.string().required(),
	// 		given_name: Joi.string().required(),
	// 		picture: Joi.string().required(),
	// 		email: Joi.string().email().required(),
	// 		address: Joi.object()
	// 			.keys({
	// 				address: Joi.string().optional(),
	// 				number: Joi.number().optional(),
	// 				city: Joi.string().optional(),
	// 				district: Joi.string().optional(),
	// 				state: Joi.string().optional(),
	// 				country: Joi.string().optional(),
	// 			})
	// 			.optional(),
	// 		infos: Joi.object()
	// 			.keys({
	// 				description: Joi.string().optional(),
	// 				professional_mail: Joi.string().optional(),
	// 				celphone: Joi.string().optional(),
	// 				second_celphone: Joi.string().optional(),
	// 				website: Joi.string().optional(),
	// 				instagram: Joi.string().optional(),
	// 				twitter: Joi.string().optional(),
	// 				tiktok: Joi.string().optional(),
	// 			})
	// 			.optional(),
	// 	},
	// }),
	usersController.create,
);

export default usersRouter;
