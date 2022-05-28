import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import ServicesTypesController from '../controllers/ServicesTypesController';

const servicesTypesRouter = Router();
const servicesTypesController = new ServicesTypesController();

servicesTypesRouter.post(
	'/',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			description: Joi.string().optional(),
			duration: Joi.string().required(),
			price: Joi.number().required(),
			paymentMethod_id: Joi.number().required(),
		},
	}),
	servicesTypesController.create,
);

servicesTypesRouter.patch(
	'/:id',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			description: Joi.string().required(),
			duration: Joi.string().required(),
			price: Joi.number().required(),
			paymentMethod_id: Joi.number().required(),
		},
	}),
	servicesTypesController.update,
);

servicesTypesRouter.get('/:id', isAuthenticated, servicesTypesController.get);

servicesTypesRouter.get('/user/all', isAuthenticated, servicesTypesController.getAll);

servicesTypesRouter.delete('/:id', isAuthenticated, servicesTypesController.delete);

export default servicesTypesRouter;
