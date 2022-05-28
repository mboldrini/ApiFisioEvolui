import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import PaymentMethodController from '../controllers/PaymentMethodController';

const paymentMethodRouter = Router();
const paymentMethodController = new PaymentMethodController();

paymentMethodRouter.post(
	'/',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
		},
	}),
	paymentMethodController.create,
);

export default paymentMethodRouter;
