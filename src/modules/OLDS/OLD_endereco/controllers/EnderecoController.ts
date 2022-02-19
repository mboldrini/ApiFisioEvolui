import { Console } from 'console';
import { Request, Response } from 'express';
import CreateEnderecoService from '../services/CreateEnderecoService';
import ShowEnderecoService from '../services/ShowEnderecoService';
import UpdateEnderecoService from '../services/UpdateEnderecoService';

export default class EnderecoController {
	public async show(request: Request, response: Response): Promise<Response> {
		const { uid } = request.user;
		const { paciente_id } = request.body;

		const showEndereco = new ShowEnderecoService();
		const endereco = await showEndereco.findByUidAndIdPaciente({ uid, paciente_id });

		return response.json(endereco);
	}

	public async create(request: Request, response: Response): Promise<Response> {
		const { logradouro, uf, cep, bairro, cidade, latitude, longitude, paciente_id } = request.body;
		const { uid } = request.user;

		const createParams = new CreateEnderecoService();
		const endereco = await createParams.execute({
			logradouro,
			uf,
			cep,
			bairro,
			cidade,
			latitude,
			longitude,
			user_uid: uid,
			paciente_id,
		});

		return response.json(endereco);
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const { logradouro, uf, cep, bairro, cidade, latitude, longitude, paciente_id } = request.body;
		const { uid } = request.user;

		const createParams = new UpdateEnderecoService();
		const endereco = await createParams.execute({
			logradouro,
			uf,
			cep,
			bairro,
			cidade,
			latitude,
			longitude,
			user_uid: uid,
			paciente_id,
		});

		return response.json(endereco);
	}
}
