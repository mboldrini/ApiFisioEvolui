import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import EvolutionsController from '../controllers/EvolutionsController';

const evolutionsRouter = Router();
const evolutionsController = new EvolutionsController();

evolutionsRouter.post(
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
	evolutionsController.create,
);

evolutionsRouter.get('/:id&:client_id', isAuthenticated, evolutionsController.get);

evolutionsRouter.patch(
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
	evolutionsController.update,
);

evolutionsRouter.delete('/:id&:client_id', isAuthenticated, evolutionsController.delete);

evolutionsRouter.get('/list/:id', isAuthenticated, evolutionsController.getList);

export default evolutionsRouter;
