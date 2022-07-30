import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import ClientsController from '../controllers/ClientsController';

const clientsRouter = Router();
const clientsController = new ClientsController();

clientsRouter.post(
	'/',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			document: Joi.string().optional(),
			email: Joi.string().optional(),
			celphone: Joi.string().required(),
			second_celphone: Joi.string().optional(),
			instagram: Joi.string().optional(),
			address: Joi.string().required(),
			latitude: Joi.string().optional(),
			longitude: Joi.string().optional(),
			serviceType_id: Joi.number().required(),
			diagnostic: Joi.object().optional().keys({
				diagnostic: Joi.string().required(),
				date: Joi.date().required(),
			}),
			complaint: Joi.object().optional().keys({
				complaint: Joi.string().required(),
				date: Joi.date().required(),
			}),
			hda: Joi.object().optional().keys({
				hda: Joi.string().required(),
				date: Joi.date().required(),
			}),
			hpp: Joi.object().optional().keys({
				hpp: Joi.string().required(),
				date: Joi.date().required(),
			}),
			funcionalDiagnosis: Joi.object().optional().keys({
				diagnostic: Joi.string().required(),
				date: Joi.date().required(),
			}),
			physicalEval: Joi.object().optional().keys({
				evaluation: Joi.string().required(),
				date: Joi.date().required(),
			}),
			respiratoryEval: Joi.object().optional().keys({
				evaluation: Joi.string().required(),
				date: Joi.date().required(),
			}),
			objective: Joi.object().optional().keys({
				objective: Joi.string().required(),
				date: Joi.date().required(),
			}),
			guideline: Joi.object().optional().keys({
				guideline: Joi.string().required(),
				date: Joi.date().required(),
			}),
		},
	}),
	clientsController.create,
);

clientsRouter.patch(
	'/:id',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			name: Joi.string().required(),
			document: Joi.string().optional(),
			email: Joi.string().optional(),
			celphone: Joi.string().required(),
			second_celphone: Joi.string().optional(),
			instagram: Joi.string().optional(),
			address: Joi.string().required(),
			latitude: Joi.string().optional(),
			longitude: Joi.string().optional(),
			serviceType_id: Joi.number().required(),
		},
	}),
	clientsController.update,
);

clientsRouter.get('/:id', isAuthenticated, clientsController.get);

clientsRouter.get('/user/all', isAuthenticated, clientsController.getAll);

clientsRouter.delete('/:id', isAuthenticated, clientsController.delete);

export default clientsRouter;
