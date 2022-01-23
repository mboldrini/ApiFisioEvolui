import { Request, Response } from 'express';
import CreateTipoAtendimentoService from '../services/CreateTipoAtendimentoService';
import ShowTipoAtendimentoService from '../services/ShowTipoAtendimentoService';
import UpdateTipoAtendimentoService from '../services/UpdateTipoAtendimentoService';

export default class TipoAtendimentoController {
	public async show(request: Request, response: Response): Promise<Response> {
		const { tipo_id } = request.body;
		const { id } = request.user;

		const showTipo = new ShowTipoAtendimentoService();
		const tipo = await showTipo.execute({
			tipo_id,
			user_id: id,
		});

		return response.json(tipo);
	}

	public async create(request: Request, response: Response): Promise<Response> {
		const { tipo, valor_atendimento, descricao } = request.body;
		const { id } = request.user;

		const createParams = new CreateTipoAtendimentoService();

		const usrConfigs = await createParams.execute({
			tipo,
			valor_atendimento,
			descricao,
			user_id: id,
		});

		return response.json(usrConfigs);
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const { id_tipo, tipo, valor_atendimento, descricao } = request.body;
		const { id } = request.user;

		const updateTipoAtendimento = new UpdateTipoAtendimentoService();

		const tipoAtendimento = await updateTipoAtendimento.execute({
			id_tipo,
			tipo,
			valor_atendimento,
			descricao,
			user_id: id,
		});

		return response.json(tipoAtendimento);
	}
}
