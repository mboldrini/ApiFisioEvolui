import { TipoAtendimentoRepository } from './../../paciente_tipoAtendimento/typeorm/repositories/TipoAtendimentoRepository';
import { PacienteRepository } from './../typeorm/repositories/PacienteRepository';
import { Request, Response } from 'express';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Paciente from '../typeorm/entities/Paciente';

interface IRequest {
	id: number;
	user_id: string;
}

interface IPctInfos {
	id: number;
	nome: string;
	cpf: string;
	dataNascimento: string;
	celular: string;
	email: string;
	tipoAtendimento: string | undefined;
	temComorbidade: boolean;
	logradouro: string;
	queixamotivo: string;
	diagnosticos: string;
	comorbidades: string;
}

class ShowPacienteService {
	public async execute({ id, user_id }: IRequest): Promise<IPctInfos> {
		const pacienteRepo = getCustomRepository(PacienteRepository);
		const tipoAtendimentoRepo = getCustomRepository(TipoAtendimentoRepository);

		const pacienteEncontrado = await pacienteRepo.findOne({
			id,
			user_id,
		});

		if (!pacienteEncontrado) {
			throw new AppError('Paciente não encontrado', 404);
		}

		const tipoAtendimento = await tipoAtendimentoRepo.findOne({
			id: pacienteEncontrado.tipoAtendimento,
			user_id,
			excluido: false,
		});

		let novoPctInfos = {
			id: pacienteEncontrado.id,
			nome: pacienteEncontrado.nome,
			cpf: pacienteEncontrado.cpf,
			dataNascimento: pacienteEncontrado.dataNascimento,
			celular: pacienteEncontrado.celular,
			email: pacienteEncontrado.email,
			tipoAtendimento: tipoAtendimento?.tipo,
			temComorbidade: pacienteEncontrado.temComorbidade,
			logradouro: pacienteEncontrado.logradouro,
			queixamotivo: pacienteEncontrado.queixamotivo,
			diagnosticos: pacienteEncontrado.diagnosticos,
			comorbidades: pacienteEncontrado.comorbidades,
		};

		return novoPctInfos;
	}
}
export default ShowPacienteService;
