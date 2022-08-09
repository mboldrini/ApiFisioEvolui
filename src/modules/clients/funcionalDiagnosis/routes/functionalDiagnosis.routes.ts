import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import FunctionalDiagnosisController from '../controllers/FunctionalDiagnosisController';

const functionalDiagnosisRouter = Router();
const functionalDiagnosisController = new FunctionalDiagnosisController();

functionalDiagnosisRouter.post(
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
	functionalDiagnosisController.create,
);

functionalDiagnosisRouter.get('/:id&:client_id', isAuthenticated, functionalDiagnosisController.get);

functionalDiagnosisRouter.patch(
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
	functionalDiagnosisController.update,
);

functionalDiagnosisRouter.delete('/:id&:client_id', isAuthenticated, functionalDiagnosisController.delete);

functionalDiagnosisRouter.get('/list/:id', isAuthenticated, functionalDiagnosisController.getList);

export default functionalDiagnosisRouter;
