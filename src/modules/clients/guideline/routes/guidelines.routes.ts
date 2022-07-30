import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import GuidelinesController from '../controllers/GuidelinesController';

const guidelineRouter = Router();
const guidelineController = new GuidelinesController();

guidelineRouter.post(
	'/',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			guideline: Joi.string().required(),
			comments: Joi.string().optional(),
			date: Joi.date().required(),
			client_id: Joi.number().required(),
		},
	}),
	guidelineController.create,
);

guidelineRouter.get('/:id&:client_id', isAuthenticated, guidelineController.get);

guidelineRouter.patch(
	'/:id',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			guideline: Joi.string().required(),
			comments: Joi.string().optional(),
			date: Joi.date().required(),
			client_id: Joi.number().required(),
		},
	}),
	guidelineController.update,
);

guidelineRouter.delete('/:id&:client_id', isAuthenticated, guidelineController.delete);

guidelineRouter.get('/list/:id', isAuthenticated, guidelineController.getList);

export default guidelineRouter;
