import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import PacientePacamentoController from '../controllers/PacientePagamentosController';

const pacientePagamentosRouter = Router();
const pacientePagamentosController = new PacientePacamentoController();

pacientePagamentosRouter.post(
	'/',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			id_paciente: Joi.number().required(),
			id_evolucao: Joi.number().required(),
		},
	}),
	pacientePagamentosController.create,
);

export default pacientePagamentosRouter;
