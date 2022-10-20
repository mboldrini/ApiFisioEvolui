import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import CreateVersionamentoService from '../services/CreateVersionamentoService';
import DeleteVersionamentoService from '../services/DeleteVersionamentoService';
import GetLastVersionService from '../services/GetLastVersionService';
import ListaVersoesService from '../services/ListaVersoesService';
import UpdateVersionService from '../services/UpdateVersionamentoService';

export default class VersionamentoController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { versao, novidades, data_publicacao } = request.body;
		const { user_code } = request.user;

		const createVersion = new CreateVersionamentoService();
		const version = await createVersion.execute({
			user_code,
			versao,
			novidades,
			data_publicacao,
		});

		return response.json(version);
	}

	public async getLastVersion(request: Request, response: Response): Promise<Response> {
		const { user_code } = request.user;

		const lastVersion = new GetLastVersionService();
		const version = await lastVersion.execute({
			user_code,
		});

		return response.json(version);
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const { id, versao, novidades, data_publicacao, liberado } = request.body;
		const { user_code } = request.user;

		const lastVersion = new UpdateVersionService();
		const version = await lastVersion.execute({
			id: parseInt(id),
			user_code,
			versao,
			novidades,
			data_publicacao,
			liberado,
		});

		return response.json(version);
	}

	public async lista(request: Request, response: Response): Promise<Response> {
		const { user_code } = request.user;

		const lastVersion = new ListaVersoesService();
		const version = await lastVersion.execute({
			user_code,
		});

		return response.json(version);
	}

	public async delete(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		const { user_code } = request.user;

		const lastVersion = new DeleteVersionamentoService();
		const version = await lastVersion.execute({
			user_code,
			id: parseInt(id),
		});

		return response.json(version);
	}
}
