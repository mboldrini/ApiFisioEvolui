import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import UserWorkDaysController from '../controllers/UserWorkDaysController';

const userWorkDaysRouter = Router();
const userWorkDayController = new UserWorkDaysController();

// userWorkDaysRouter.post('/', isAuthenticated, userWorkDayController.create);

userWorkDaysRouter.patch(
	'/',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			sunday: Joi.object().optional().keys({
				enabled: Joi.boolean().required(),
				start: Joi.string().required(),
				end: Joi.string().required(),
			}),

			monday: Joi.object().optional().keys({
				enabled: Joi.boolean().required(),
				start: Joi.string().required(),
				end: Joi.string().required(),
			}),

			tuesday: Joi.object().optional().keys({
				enabled: Joi.boolean().required(),
				start: Joi.string().required(),
				end: Joi.string().required(),
			}),

			wednesday: Joi.object().optional().keys({
				enabled: Joi.boolean().required(),
				start: Joi.string().required(),
				end: Joi.string().required(),
			}),

			thursday: Joi.object().optional().keys({
				enabled: Joi.boolean().required(),
				start: Joi.string().required(),
				end: Joi.string().required(),
			}),

			friday: Joi.object().optional().keys({
				enabled: Joi.boolean().required(),
				start: Joi.string().required(),
				end: Joi.string().required(),
			}),

			saturday: Joi.object().optional().keys({
				enabled: Joi.boolean().required(),
				start: Joi.string().required(),
				end: Joi.string().required(),
			}),
		},
	}),
	userWorkDayController.update,
);

userWorkDaysRouter.get('/', isAuthenticated, userWorkDayController.get);

export default userWorkDaysRouter;
