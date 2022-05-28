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
			sunday: Joi.boolean().required(),
			sunday_startHour: Joi.string().required(),
			sunday_endHour: Joi.string().required(),
			monday: Joi.boolean().required(),
			monday_startHour: Joi.string().required(),
			monday_endHour: Joi.string().required(),
			tuesday: Joi.boolean().required(),
			tuesday_startHour: Joi.string().required(),
			tuesday_endHour: Joi.string().required(),
			wednesday: Joi.boolean().required(),
			wednesday_startHour: Joi.string().required(),
			wednesday_endHour: Joi.string().required(),
			thursday: Joi.boolean().required(),
			thursday_startHour: Joi.string().required(),
			thursday_endHour: Joi.string().required(),
			friday: Joi.boolean().required(),
			friday_startHour: Joi.string().required(),
			friday_endHour: Joi.string().required(),
			saturday: Joi.boolean().required(),
			saturday_startHour: Joi.string().required(),
			saturday_endHour: Joi.string().required(),
		},
	}),
	userWorkDayController.update,
);

export default userWorkDaysRouter;
