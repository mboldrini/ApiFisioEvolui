import CreateAgendamentoService from '@modules/paciente_agendamento/services/CreateAgendamentoService';
import DeleteAllAgendamentoService from '@modules/paciente_agendamento/services/DeleteAllAgendamentoService';
import { Request, Response } from 'express';
import CreatePacienteService from '../services/CreatePacienteService';
import DeletePacienteService from '../services/DeletePacienteService';
import ShowAllPacienteService from '../services/ShowAllPacientesService';
import ShowPacienteService from '../services/ShowPacienteService';
import UpdatePacienteService from '../services/UpdatePacienteService';

export default class PacienteController {
	public async show(request: Request, response: Response): Promise<Response> {
		const { id } = request.body;
		const usrId = request.user.id;

		const showPaciente = new ShowPacienteService();
		const pct = await showPaciente.execute({
			id,
			user_id: usrId,
		});

		return response.json(pct);
	}

	public async create(request: Request, response: Response): Promise<Response> {
		const {
			nome,
			cpf,
			dataNascimento,
			celular,
			telefoneRecado,
			email,
			tipoAtendimento,
			temComorbidade,
			logradouro,
			uf,
			bairro,
			numero,
			referencia,
			agendamentos,
			queixamotivo,
			diagnosticos,
			comorbidades,
		} = request.body;

		const { id } = request.user;

		const createParams = new CreatePacienteService();
		const pct = await createParams.execute({
			nome,
			cpf,
			dataNascimento,
			celular,
			telefoneRecado,
			email,
			tipoAtendimento,
			temComorbidade,
			logradouro,
			uf,
			bairro,
			numero,
			referencia,
			excluido: false,
			user_id: id,
			queixamotivo,
			diagnosticos,
			comorbidades,
		});

		const pacienteAgendamento = new CreateAgendamentoService();
		const agendm = await pacienteAgendamento.execute({
			paciente_id: pct.id,
			user_id: id,
			agendamentos,
		});

		return response.json({ paciente: pct, agendamento: agendm });
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const {
			id,
			nome,
			cpf,
			dataNascimento,
			celular,
			telefoneRecado,
			email,
			tipoAtendimento,
			temComorbidade,
			logradouro,
			uf,
			bairro,
			numero,
			referencia,
			queixamotivo,
			diagnosticos,
			comorbidades,
		} = request.body;

		const user_id = request.user.id;

		const createParams = new UpdatePacienteService();

		const pct = await createParams.execute({
			id,
			nome,
			cpf,
			dataNascimento,
			celular,
			telefoneRecado,
			email,
			tipoAtendimento,
			temComorbidade,
			logradouro,
			uf,
			bairro,
			numero,
			referencia,
			user_id,
			queixamotivo,
			diagnosticos,
			comorbidades,
		});

		return response.json(pct);
	}

	public async showAll(request: Request, response: Response): Promise<Response> {
		const { id } = request.user;

		const showPaciente = new ShowAllPacienteService();
		const pct = await showPaciente.execute({
			user_id: id,
		});

		return response.json(pct);
	}

	public async delete(request: Request, response: Response): Promise<Response> {
		const { id } = request.body;
		const user_id = request.user.id;

		const excluiAgendamentosPct = new DeleteAllAgendamentoService();
		const pctDelAgendamentos = await excluiAgendamentosPct.execute({ paciente_id: id, user_id });

		const excluiPaciente = new DeletePacienteService();
		const pctDel = await excluiPaciente.execute({ paciente_id: id, user_id });

		return response.json({ message: 'Paciente e agendamentos excluidos com sucesso!' });
	}
}
