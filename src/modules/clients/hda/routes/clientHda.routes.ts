import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import ClientHdaController from '../controllers/ClientHdaController';

const clientHdaRouter = Router();
const clientHdaController = new ClientHdaController();

clientHdaRouter.post(
	'/',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			hda: Joi.string().required(),
			comments: Joi.string().optional(),
			date: Joi.date().required(),
			client_id: Joi.number().required(),
		},
	}),
	clientHdaController.create,
);

clientHdaRouter.get('/:id&:client_id', isAuthenticated, clientHdaController.get);

clientHdaRouter.patch(
	'/:id',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			hda: Joi.string().required(),
			comments: Joi.string().optional(),
			date: Joi.date().required(),
			client_id: Joi.number().required(),
		},
	}),
	clientHdaController.update,
);

clientHdaRouter.delete('/:id&:client_id', isAuthenticated, clientHdaController.delete);

clientHdaRouter.get('/list/:id', isAuthenticated, clientHdaController.getList);

export default clientHdaRouter;
