import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import ClientHppController from '../controllers/ClientHPPController';

const clientHppRouter = Router();
const clientHppController = new ClientHppController();

clientHppRouter.post(
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
	clientHppController.create,
);

clientHppRouter.get('/:id&:client_id', isAuthenticated, clientHppController.get);

clientHppRouter.patch(
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
	clientHppController.update,
);

clientHppRouter.delete('/:id&:client_id', isAuthenticated, clientHppController.delete);

clientHppRouter.get('/list/:id', isAuthenticated, clientHppController.getList);

export default clientHppRouter;
