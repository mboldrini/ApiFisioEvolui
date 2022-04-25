import { Request, Response } from 'express';
import CreateAgendamentoService from '../services/CreateAgendamentoService';
import DeleteAgendamentoService from '../services/DeleteAgendamentoService';
import DeleteAllAgendamentoService from '../services/DeleteAllAgendamentoService';
import ShowAgendamentoService from '../services/ShowAgendamentoService';
import ShowAllAgendamentoService from '../services/ShowAllAgendamentoService';
import ShowAllDayAgendamentoService from '../services/ShowAllDayAgendamentoService';
import ShowAllAppointmentsDayAgendamentoService from '../services/ShowAllAppointmentsOfDayService';
import UpdateAgendamentoService from '../services/UpdateAgendamentoService';

interface IAgendamento {
	dataHora: string;
	tipo: number;
	status: number;
	excluido: boolean;
}

interface IUpdate {
	id: number;
	paciente_id: number;
}

export default class AgendamentoController {
	public async update(request: Request, response: Response): Promise<Response> {
		const { id, dataHora, data, tipo, status, paciente_id } = request.body;
		const user_id = request.user.id;

		const updateAgendamento = new UpdateAgendamentoService();
		const agendamento = await updateAgendamento.execute({
			id,
			dataHora,
			data,
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
		const { id } = request.params;
		const user_id = request.user.id;

		let idUrl = parseInt(id);

		const showAgendamento = new ShowAgendamentoService();
		const agendamento = await showAgendamento.execute({ id: idUrl, user_id });

		return response.json(agendamento);
	}

	public async showAll(request: Request, response: Response): Promise<Response> {
		const { dataInicio, dataFim, paciente_id } = request.body;
		const user_id = request.user.id;

		const showAllAgendamento = new ShowAllAgendamentoService();
		const agendamentos = await showAllAgendamento.execute({ dataInicio, dataFim, paciente_id, user_id });

		return response.json(agendamentos);
	}

	public async showAllHoursDay(request: Request, response: Response): Promise<Response> {
		// Exibe os horarios disponiveis no dia
		const { dataInicio, dataFim } = request.body;
		const user_id = request.user.id;

		const showAllDayAgendamentos = new ShowAllDayAgendamentoService();
		const agendamentos = await showAllDayAgendamentos.execute({ dataInicio, dataFim, user_id });

		return response.json(agendamentos);
	}

	public async showAllAppointmentsDay(request: Request, response: Response): Promise<Response> {
		// Exibe os AGENDAMENTOS disponiveis no dia
		const { dataInicio, dataFim } = request.body;
		const user_id = request.user.id;

		const showAllAppDayAgendamentos = new ShowAllAppointmentsDayAgendamentoService();
		const agendamentos = await showAllAppDayAgendamentos.execute({ dataInicio, dataFim, user_id });

		return response.json(agendamentos);
	}

	public async delete(request: Request, response: Response): Promise<Response> {
		const { id, paciente_id }: IUpdate = request.body;
		const user_id = request.user.id;

		const showAgendamento = new DeleteAgendamentoService();
		const agendamento = await showAgendamento.execute({ id, paciente_id, user_id });

		return response.json(agendamento);
	}

	public async deleteAll(request: Request, response: Response): Promise<Response> {
		const { paciente_id } = request.params;
		const user_id = request.user.id;

		const pctId = parseInt(paciente_id);

		const showAgendamento = new DeleteAllAgendamentoService();
		const agendamento = await showAgendamento.execute({ paciente_id: pctId, user_id });

		return response.json(agendamento);
	}
}
