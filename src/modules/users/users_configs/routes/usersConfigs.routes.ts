import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import UserConfigsController from '../controllers/UserConfigsController';

const usersConfigsRouter = Router();
const usersConfigsController = new UserConfigsController();

// usersConfigsRouter.post(
// 	'/',
// 	isAuthenticated,
// 	celebrate({
// 		[Segments.BODY]: {
// 			start_workHour: Joi.string().optional(),
// 			end_workHour: Joi.string().optional(),
// 			allow_retroactiveDate: Joi.boolean().optional(),
// 			allow_notifications: Joi.boolean().optional(),
// 			schedule_startDay: Joi.boolean().optional(),
// 			user_premium: Joi.boolean().optional(),
// 			premium_type: Joi.number().optional(),
// 			premium_until: Joi.string().optional(),
// 		},
// 	}),
// 	usersConfigsController.create,
// );

usersConfigsRouter.post(
	'/',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			allow_retroactiveDate: Joi.boolean().required(),
			allow_notifications: Joi.boolean().required(),
			schedule_startDay: Joi.boolean().required(),
			user_premium: Joi.boolean().required(),
			premium_type: Joi.number().required(),
			premium_until: Joi.string().required(),
		},
	}),
	usersConfigsController.update,
);

usersConfigsRouter.get('/', isAuthenticated, usersConfigsController.get);

export default usersConfigsRouter;
