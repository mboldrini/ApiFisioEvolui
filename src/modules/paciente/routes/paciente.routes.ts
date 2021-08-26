import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import PacienteController from '../controllers/PacienteController';

const pacienteRouter = Router();
const pacienteController = new PacienteController();

pacienteRouter.get('/', isAuthenticated, pacienteController.show);

pacienteRouter.post(
	'/',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			nome: Joi.string().required(),
			telefoneCelular: Joi.string().required(),
			telefoneContato: Joi.string().optional(),
			email: Joi.string().optional(),
			cpf: Joi.string().optional(),
			tem_comorbidade: Joi.number().required(),
			comorbidade_descricao: Joi.string().optional(),
			ultimoAtendimento: Joi.date().optional(),
			excluido: Joi.number().required(),
			endereco: Joi.object(),
		},
	}),
	pacienteController.create,
);

pacienteRouter.put(
	'/',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			paciente_id: Joi.number().required(),
			nome: Joi.string().required(),
			telefoneCelular: Joi.string().required(),
			telefoneContato: Joi.string().optional(),
			email: Joi.string().optional(),
			cpf: Joi.string().optional(),
			tem_comorbidade: Joi.number().required(),
			comorbidade_descricao: Joi.string().optional(),
			ultimoAtendimento: Joi.date().optional(),
			excluido: Joi.number().required(),
			endereco: Joi.object(),
		},
	}),
	pacienteController.update,
);

// enderecoRouter.put(
// 	'/',
// 	isAuthenticated,
// 	celebrate({
// 		[Segments.BODY]: {
// 			id: Joi.number().required(),
// 			logradouro: Joi.string().required(),
// 			uf: Joi.string().required(),
// 			cep: Joi.string().required(),
// 			bairro: Joi.string().required(),
// 			cidade: Joi.string().required(),
// 			latitude: Joi.number().required(),
// 			longitude: Joi.number().required(),
// 		},
// 	}),
// 	enderecoController.update,
// );

export default pacienteRouter;
