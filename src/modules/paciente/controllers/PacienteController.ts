import CreateAgendamentoService from '@modules/paciente_agendamento/services/CreateAgendamentoService';
import { Request, Response } from 'express';
import CreatePacienteService from '../services/CreatePacienteService';
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
			excluido: 0,
			user_id: id,
		});

		console.log(pct);

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
}
