import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import SessionsController from '../controllers/SessionsController';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			magic_code: Joi.string().optional(),
			user_code: Joi.string().required(),
			email: Joi.string().email().required(),
		},
	}),
	sessionsController.create,
);

export default sessionsRouter;
