import CreateEnderecoService from '@modules/endereco/services/CreateEnderecoService';
import { Console } from 'console';
import { Request, Response } from 'express';
import CreatePacienteService from '../services/CreatePacienteService';

// interface IEndereco {
// 	logradouro: string;
// 	uf: string;
// 	cep: string;
// 	bairro: string;
// 	cidade: string;
// 	latitude: number;
// 	longitude: number;
// }

export default class PacienteController {
	public async create(request: Request, response: Response): Promise<Response> {
		const {
			nome,
			telefoneCelular,
			telefoneContato,
			email,
			cpf,
			tem_comorbidade,
			comorbidade_descricao,
			ultimoAtendimento,
			excluido,
		} = request.body;
		const { uid } = request.user;

		const createParams = new CreatePacienteService();
		const paciente = await createParams.execute({
			nome,
			telefoneCelular,
			telefoneContato,
			email,
			cpf,
			tem_comorbidade,
			comorbidade_descricao,
			ultimoAtendimento,
			excluido,
			user_uid: uid,
		});

		return response.json(paciente);
	}
}
