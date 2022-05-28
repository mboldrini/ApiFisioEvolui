import { Router } from 'express';
import ClientsAddressController from '../controllers/ClientAddressController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const clientAddressRouter = Router();
const clientAddressController = new ClientsAddressController();

clientAddressRouter.post(
	'/',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			address: Joi.string().optional(),
			number: Joi.number().optional(),
			city: Joi.string().optional(),
			district: Joi.string().optional(),
			state: Joi.string().optional(),
			country: Joi.string().optional(),
		},
	}),
	clientAddressController.create,
);

clientAddressRouter.patch(
	'/:id',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			address: Joi.string().required(),
			number: Joi.number().required(),
			city: Joi.string().required(),
			district: Joi.string().required(),
			state: Joi.string().required(),
			country: Joi.string().required(),
		},
	}),
	clientAddressController.update,
);

clientAddressRouter.get('/:id', isAuthenticated, clientAddressController.get);

export default clientAddressRouter;
