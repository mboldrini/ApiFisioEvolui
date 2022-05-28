import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import ClientsController from '../controllers/ClientsController';

const clientsRouter = Router();
const clientsController = new ClientsController();

clientsRouter.post(
	'/',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			document: Joi.string().optional(),
			email: Joi.string().optional(),
			celphone: Joi.string().required(),
			second_celphone: Joi.string().optional(),
			instagram: Joi.string().optional(),
			address: Joi.object().keys({
				address: Joi.string().optional(),
				number: Joi.number().optional(),
				city: Joi.string().optional(),
				district: Joi.string().optional(),
				state: Joi.string().optional(),
				country: Joi.string().optional(),
			}),
		},
	}),
	clientsController.create,
);

clientsRouter.patch(
	'/:id',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			document: Joi.string().optional(),
			email: Joi.string().optional(),
			celphone: Joi.string().required(),
			second_celphone: Joi.string().optional(),
			instagram: Joi.string().optional(),
			address: Joi.object().keys({
				address: Joi.string().optional(),
				number: Joi.number().optional(),
				city: Joi.string().optional(),
				district: Joi.string().optional(),
				state: Joi.string().optional(),
				country: Joi.string().optional(),
			}),
		},
	}),
	clientsController.update,
);

clientsRouter.get('/:id', isAuthenticated, clientsController.get);

clientsRouter.get('/user/all', isAuthenticated, clientsController.getAll);

clientsRouter.delete('/:id', isAuthenticated, clientsController.delete);

export default clientsRouter;
