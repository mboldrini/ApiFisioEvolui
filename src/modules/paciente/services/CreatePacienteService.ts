import { TipoAtendimentoRepository } from './../../tipo_atendimento/typeorm/repositories/TipoAtendimentoRepository';
import { PacienteRepository } from './../typeorm/repositories/PacienteRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Paciente from '../typeorm/entities/Paciente';

interface IRequest {
	nome: string;
	cpf: string;
	dataNascimento?: string;
	celular: string;
	telefoneRecado?: string;
	email?: string;
	tipoAtendimento: number;
	temComorbidade: boolean;
	logradouro?: string;
	uf: string;
	bairro?: string;
	numero?: string;
	referencia?: string;
	excluido: boolean;
	user_id: string;
}

class CreatePacienteService {
	public async execute({
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
		excluido,
		user_id,
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

		excluido = false;

		const novoPct = await novoPaciente.create({
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
			excluido,
			user_id,
		});

		await novoPaciente.save(novoPct);

		return novoPct;
	}
}
export default CreatePacienteService;
