import { TipoAtendimentoRepository } from './../../tipo_atendimento/typeorm/repositories/TipoAtendimentoRepository';
import { PacienteRepository } from './../typeorm/repositories/PacienteRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Paciente from '../typeorm/entities/Paciente';

interface IRequest {
	id: number;
	nome: string;
	cpf: string;
	dataNascimento: string; //era opcional
	celular: string;
	telefoneRecado: string; //era opcional
	email: string; //era opcional
	tipoAtendimento: number;
	temComorbidade: boolean;
	logradouro: string; //era opcional
	uf: string;
	bairro: string; //era opcional
	referencia: string; //era opcional
	user_id: string;
	queixamotivo: string;
	diagnosticos: string;
	comorbidades: string;
}

class UpdatePacienteService {
	public async execute({
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
		referencia,
		user_id,
		queixamotivo,
		diagnosticos,
		comorbidades,
	}: IRequest): Promise<Paciente> {
		const novoPaciente = getCustomRepository(PacienteRepository);

		const tipoAtendimentoRepo = getCustomRepository(TipoAtendimentoRepository);

		const tipoAtendimentoExiste = await tipoAtendimentoRepo.findByIdAndUser({
			tipo_id: tipoAtendimento,
			user_id,
		});

		if (!tipoAtendimentoExiste) {
			throw new AppError('Tipo de Atendimento não encontrado', 404);
		}

		const pacienteExiste = await novoPaciente.findByIdAndUser({
			id,
			user_id,
		});

		if (!pacienteExiste) {
			throw new AppError('Paciente não encontrado', 404);
		}

		if (pacienteExiste.nome != nome) {
			pacienteExiste.nome = nome;
		}
		if (pacienteExiste.cpf != cpf) {
			pacienteExiste.cpf = cpf;
		}
		if (pacienteExiste.dataNascimento != dataNascimento) {
			pacienteExiste.dataNascimento = dataNascimento;
		}
		if (pacienteExiste.celular != celular) {
			pacienteExiste.celular = celular;
		}
		if (pacienteExiste.telefoneRecado != telefoneRecado) {
			pacienteExiste.telefoneRecado = telefoneRecado;
		}
		if (pacienteExiste.email != email) {
			pacienteExiste.email = email;
		}
		if (pacienteExiste.tipoAtendimento != tipoAtendimento) {
			pacienteExiste.tipoAtendimento = tipoAtendimento;
		}
		if (pacienteExiste.temComorbidade != temComorbidade) {
			pacienteExiste.temComorbidade = temComorbidade;
		}
		if (pacienteExiste.logradouro != logradouro) {
			pacienteExiste.logradouro = logradouro;
		}
		if (pacienteExiste.uf != uf) {
			pacienteExiste.uf = uf;
		}
		if (pacienteExiste.bairro != bairro) {
			pacienteExiste.bairro = bairro;
		}
		if (pacienteExiste.referencia != referencia) {
			pacienteExiste.referencia = referencia;
		}

		if (pacienteExiste.queixamotivo != queixamotivo) {
			pacienteExiste.queixamotivo = queixamotivo;
		}

		if (pacienteExiste.diagnosticos != diagnosticos) {
			pacienteExiste.diagnosticos = diagnosticos;
		}

		if (pacienteExiste.comorbidades != comorbidades) {
			pacienteExiste.comorbidades = comorbidades;
		}

		pacienteExiste.excluido = false;

		const novoPct = await novoPaciente.save(pacienteExiste);

		await novoPaciente.save(novoPct);

		return novoPct;
	}
}
export default UpdatePacienteService;
