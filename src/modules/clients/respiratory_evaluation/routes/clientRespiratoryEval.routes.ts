import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import ClientRespiratoryEvalController from '../controllers/ClientRespiratoryEvalController';

const clientResEvalRouter = Router();
const clientRespEvalController = new ClientRespiratoryEvalController();

clientResEvalRouter.post(
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
	clientRespEvalController.create,
);

clientResEvalRouter.get('/:id&:client_id', isAuthenticated, clientRespEvalController.get);

clientResEvalRouter.patch(
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
	clientRespEvalController.update,
);

clientResEvalRouter.delete('/:id&:client_id', isAuthenticated, clientRespEvalController.delete);

clientResEvalRouter.get('/list/:id', isAuthenticated, clientRespEvalController.getList);

export default clientResEvalRouter;
