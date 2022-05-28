import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import ServicePaymentController from '../controllers/ServicePaymentController';

const servicePaymentRouter = Router();
const servicePaymentController = new ServicePaymentController();

servicePaymentRouter.post(
	'/',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			appointment_id: Joi.number().required(),
			comments: Joi.string().optional(),
			status: Joi.number().required(),
			scheduled: Joi.boolean().required(),
			serviceType_id: Joi.number().required(),
		},
	}),
	servicePaymentController.create,
);

servicePaymentRouter.patch(
	'/:id',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			appointment_id: Joi.number().required(),
			comments: Joi.string().required(),
			status: Joi.number().required(),
			scheduled: Joi.boolean().required(),
			serviceType_id: Joi.number().required(),
		},
	}),
	servicePaymentController.update,
);

servicePaymentRouter.get('/:id', isAuthenticated, servicePaymentController.get);

servicePaymentRouter.patch(
	'/scheduled/:id',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			scheduled: Joi.boolean().required(),
		},
	}),
	servicePaymentController.cancel,
);

servicePaymentRouter.delete('/:id', isAuthenticated, servicePaymentController.delete);

export default servicePaymentRouter;
