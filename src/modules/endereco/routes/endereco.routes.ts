import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import EnderecoController from '../controllers/EnderecoController';

const enderecoRouter = Router();
const enderecoController = new EnderecoController();

enderecoRouter.get('/', isAuthenticated, enderecoController.show);

// também não pode cadastrar direto
//enderecoRouter.post('/', isAuthenticated, enderecoController.create);

enderecoRouter.put(
	'/',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			id: Joi.number().required(),
			logradouro: Joi.string().required(),
			uf: Joi.string().required(),
			cep: Joi.string().required(),
			bairro: Joi.string().required(),
			cidade: Joi.string().required(),
			latitude: Joi.number().required(),
			longitude: Joi.number().required(),
		},
	}),
	enderecoController.update,
);

export default enderecoRouter;
