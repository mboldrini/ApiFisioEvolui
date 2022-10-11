import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import ClientObjectiveController from '../controllers/ClientObjectiveController';
// import ClientHppController from '../controllers/ClientHPPController';

const clientObjectiveRouter = Router();
const clientObjectiveController = new ClientObjectiveController();

clientObjectiveRouter.post(
	'/',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			about: Joi.string().required(),
			comments: Joi.string().optional(),
			date: Joi.date().required(),
			client_id: Joi.number().required(),
		},
	}),
	clientObjectiveController.create,
);

clientObjectiveRouter.get('/:id&:client_id', isAuthenticated, clientObjectiveController.get);

clientObjectiveRouter.patch(
	'/:id',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			about: Joi.string().required(),
			comments: Joi.string().optional(),
			date: Joi.date().required(),
			client_id: Joi.number().required(),
		},
	}),
	clientObjectiveController.update,
);

clientObjectiveRouter.delete('/:id&:client_id', isAuthenticated, clientObjectiveController.delete);

clientObjectiveRouter.get('/list/:id', isAuthenticated, clientObjectiveController.getList);

export default clientObjectiveRouter;
