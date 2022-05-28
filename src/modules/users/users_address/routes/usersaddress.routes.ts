import { Router } from 'express';
import UsersController from '../controllers/UsersAddressController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const usersAddressRouter = Router();
const usersAddressController = new UsersController();

usersAddressRouter.post(
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
	usersAddressController.create,
);

usersAddressRouter.patch(
	'/',
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
	usersAddressController.update,
);

usersAddressRouter.get('/', isAuthenticated, usersAddressController.get);

export default usersAddressRouter;
