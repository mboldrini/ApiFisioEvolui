import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import PaymentMethodUserController from '../controllers/PaymentMethodUserController';

const paymentMethodUserRouter = Router();
const paymentMethodUserController = new PaymentMethodUserController();

paymentMethodUserRouter.post(
	'/',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			description: Joi.string().optional(),
		},
	}),
	paymentMethodUserController.create,
);

paymentMethodUserRouter.patch(
	'/:id',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			description: Joi.string().required(),
		},
	}),
	paymentMethodUserController.update,
);

paymentMethodUserRouter.delete('/:id', isAuthenticated, paymentMethodUserController.delete);

paymentMethodUserRouter.get('/:id', isAuthenticated, paymentMethodUserController.get);

paymentMethodUserRouter.get('/user/all', isAuthenticated, paymentMethodUserController.getAll);

export default paymentMethodUserRouter;
