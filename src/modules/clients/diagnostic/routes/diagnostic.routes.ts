import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import DiagnosticController from '../controllers/DiagnosticController';

const diagnosticRouter = Router();
const diagnosticController = new DiagnosticController();

diagnosticRouter.post(
	'/',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			diagnostic: Joi.string().required(),
			comments: Joi.string().optional(),
			date: Joi.date().required(),
			client_id: Joi.number().required(),
		},
	}),
	diagnosticController.create,
);

diagnosticRouter.get('/:id&:client_id', isAuthenticated, diagnosticController.get);

diagnosticRouter.patch(
	'/:id',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			diagnostic: Joi.string().required(),
			comments: Joi.string().optional(),
			date: Joi.date().required(),
			client_id: Joi.number().required(),
		},
	}),
	diagnosticController.update,
);

diagnosticRouter.delete('/:id&:client_id', isAuthenticated, diagnosticController.delete);

diagnosticRouter.get('/list/:id', isAuthenticated, diagnosticController.getList);

export default diagnosticRouter;
