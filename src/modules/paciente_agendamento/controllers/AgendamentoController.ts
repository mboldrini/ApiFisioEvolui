import { Request, Response } from 'express';
import CreateAgendamentoService from '../services/CreateAgendamentoService';
import ShowAgendamentoService from '../services/ShowAgendamentoService';
import UpdateAgendamentoService from '../services/UpdateAgendamentoService';

interface IAgendamento {
	dataHora: string;
	tipo: number;
	status: number;
	excluido: boolean;
}

export default class AgendamentoController {
	public async update(request: Request, response: Response): Promise<Response> {
		const { id, dataHora, tipo, status, excluido, paciente_id } = request.body;
		const user_id = request.user.id;

		const updateAgendamento = new UpdateAgendamentoService();
		const agendamento = await updateAgendamento.execute({
			id,
			dataHora,
			tipo,
			status,
			paciente_id,
			user_id,
		});

		return response.json(agendamento);
	}

	public async create(request: Request, response: Response): Promise<Response> {
		const { paciente_id, agendamentos } = request.body;
		const user_id = request.user.id;

		const createAgendamento = new CreateAgendamentoService();

		const agendament = await createAgendamento.execute({ paciente_id, user_id, agendamentos });

		return response.json(agendament);
	}

	public async show(request: Request, response: Response): Promise<Response> {
		const { id } = request.body;
		const user_id = request.user.id;

		const showAgendamento = new ShowAgendamentoService();
		const agendamento = await showAgendamento.execute({ id, user_id });

		return response.json(agendamento);
	}
}
