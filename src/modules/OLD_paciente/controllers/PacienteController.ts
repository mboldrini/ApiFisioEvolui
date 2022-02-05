import CreateEnderecoService from '@modules/OLD_endereco/services/CreateEnderecoService';
import ShowEnderecoService from '@modules/OLD_endereco/services/ShowEnderecoService';
import UpdateEnderecoService from '@modules/OLD_endereco/services/UpdateEnderecoService';
import CreatePacienteAgendaService from '@modules/OLD_paciente_agenda/services/CreatePacienteAgendaService';
import { Console } from 'console';
import { Request, Response } from 'express';
import CreatePacienteService from '../services/CreatePacienteService';
import ShowPacienteService from '../services/ShowPacienteService';
import UpdatePacienteService from '../services/UpdatePacienteService';

export default class PacienteController {
	public async show(request: Request, response: Response): Promise<Response> {
		const { uid } = request.user;
		const { paciente_id } = request.body;

		const pacienteServ = new ShowPacienteService();
		const paciente = await pacienteServ.execute({ user_uid: uid, paciente_id });

		const showEndereco = new ShowEnderecoService();
		const endereco = await showEndereco.findByUidAndIdPaciente({ uid, paciente_id });

		return response.json({ paciente, endereco });
	}

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
			endereco,
			agenda,
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

		const { logradouro, cep, uf, bairro, cidade, latitude, longitude } = endereco;
		const createEndereco = new CreateEnderecoService();
		const enderecoCriar = await createEndereco.execute({
			logradouro,
			uf,
			cep,
			bairro,
			cidade,
			latitude,
			longitude,
			user_uid: uid,
			paciente_id: paciente.id,
		});

		const createPacienteAgenda = new CreatePacienteAgendaService();
		const agendaCriar = await createPacienteAgenda.execute(agenda, uid, paciente.id);

		return response.json({ paciente, endereco: enderecoCriar, agenda: agendaCriar });
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const {
			paciente_id,
			nome,
			telefoneCelular,
			telefoneContato,
			email,
			cpf,
			tem_comorbidade,
			comorbidade_descricao,
			ultimoAtendimento,
			excluido,
			endereco,
		} = request.body;
		const { uid } = request.user;

		const updateParams = new UpdatePacienteService();
		const paciente = await updateParams.execute({
			paciente_id,
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

		const { logradouro, cep, uf, bairro, cidade, latitude, longitude } = endereco;
		const updateEndereco = new UpdateEnderecoService();
		const enderecocriar = await updateEndereco.execute({
			logradouro,
			uf,
			cep,
			bairro,
			cidade,
			latitude,
			longitude,
			user_uid: uid,
			paciente_id: paciente.id,
		});

		return response.json({ paciente, endereco });
	}
}
