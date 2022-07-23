import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import ComplaintController from '../controllers/ComplaintController';

const complaintRouter = Router();
const complaintController = new ComplaintController();

complaintRouter.post(
	'/',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			complaint: Joi.string().required(),
			comments: Joi.string().optional(),
			date: Joi.date().required(),
			client_id: Joi.number().required(),
		},
	}),
	complaintController.create,
);

complaintRouter.get('/:id&:client_id', isAuthenticated, complaintController.get);

complaintRouter.patch(
	'/:id',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			complaint: Joi.string().required(),
			comments: Joi.string().optional(),
			date: Joi.date().required(),
			client_id: Joi.number().required(),
		},
	}),
	complaintController.update,
);

complaintRouter.delete('/:id&:client_id', isAuthenticated, complaintController.delete);

complaintRouter.get('/list/:id', isAuthenticated, complaintController.getList);

export default complaintRouter;
