import { Request, Response } from 'express';
import CreateTipoAtendimentoService from '../services/CreateTipoAtendimentoService';
import DeleteTipoAtendimentoService from '../services/DeleteTipoAtendimentoService';
import ShowAllTipoAtendimentoService from '../services/ShowAllTipoAtendimentoService';
import ShowTipoAtendimentoService from '../services/ShowTipoAtendimentoService';
import UpdateTipoAtendimentoService from '../services/UpdateTipoAtendimentoService';

export default class TipoAtendimentoController {
	public async show(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		const user_id = request.user.id;

		let idTipo = parseInt(id);

		const showTipo = new ShowTipoAtendimentoService();
		const tipo = await showTipo.execute({
			id: idTipo,
			user_id,
		});

		return response.json(tipo);
	}

	public async showall(request: Request, response: Response): Promise<Response> {
		const { id } = request.user;

		const showAll = new ShowAllTipoAtendimentoService();
		const tipo = await showAll.execute({
			user_id: id,
		});

		const tipoAtendimentoNovo = tipo.map(atend => {
			return {
				id: atend.id,
				nome: atend.tipo,
				valor: atend.valor_atendimento,
				descricao: atend.descricao,
			};
		});

		return response.json(tipoAtendimentoNovo);
	}

	public async create(request: Request, response: Response): Promise<Response> {
		const { tipo, valor_atendimento, descricao } = request.body;
		const { id } = request.user;

		const createParams = new CreateTipoAtendimentoService();

		console.log(request.body);

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

	public async delete(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		const user_id = request.user.id;

		let idAtendimento = parseInt(id);

		const deleteTipoAtendimento = new DeleteTipoAtendimentoService();

		console.log(idAtendimento);

		const tipoAtendimento = await deleteTipoAtendimento.execute({
			id,
			user_id,
		});

		return response.json(tipoAtendimento);
	}
}
