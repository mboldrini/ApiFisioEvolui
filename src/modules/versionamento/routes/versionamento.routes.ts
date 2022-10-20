import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import VersionamentoController from '../controllers/VersionamentoController';

const versionamentoRouter = Router();
const versionamenntoController = new VersionamentoController();

versionamentoRouter.post(
	'/',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			versao: Joi.string().required(),
			novidades: Joi.string().required(),
			data_publicacao: Joi.date().optional(),
		},
	}),
	versionamenntoController.create,
);

versionamentoRouter.get('/last', isAuthenticated, versionamenntoController.getLastVersion);

versionamentoRouter.patch(
	'/',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			id: Joi.number().required(),
			versao: Joi.string().optional(),
			novidades: Joi.string().optional(),
			data_publicacao: Joi.date().optional(),
			liberado: Joi.boolean().required(),
		},
	}),
	versionamenntoController.update,
);

versionamentoRouter.get('/list', isAuthenticated, versionamenntoController.lista);

versionamentoRouter.delete('/:id', isAuthenticated, versionamenntoController.delete);

export default versionamentoRouter;
