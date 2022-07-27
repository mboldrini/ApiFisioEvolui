import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import ClientPhysicalEvalController from '../controllers/ClientPhysicalEvalController';

const clientPEvalRouter = Router();
const clientPEvalController = new ClientPhysicalEvalController();

clientPEvalRouter.post(
	'/',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			evaluation: Joi.string().required(),
			comments: Joi.string().optional(),
			date: Joi.date().required(),
			client_id: Joi.number().required(),
		},
	}),
	clientPEvalController.create,
);

clientPEvalRouter.get('/:id&:client_id', isAuthenticated, clientPEvalController.get);

clientPEvalRouter.patch(
	'/:id',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			evaluation: Joi.string().required(),
			comments: Joi.string().optional(),
			date: Joi.date().required(),
			client_id: Joi.number().required(),
		},
	}),
	clientPEvalController.update,
);

clientPEvalRouter.delete('/:id&:client_id', isAuthenticated, clientPEvalController.delete);

clientPEvalRouter.get('/list/:id', isAuthenticated, clientPEvalController.getList);

export default clientPEvalRouter;
