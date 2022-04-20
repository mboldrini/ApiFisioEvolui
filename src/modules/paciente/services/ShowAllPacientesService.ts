import { PacienteRepository } from './../typeorm/repositories/PacienteRepository';
import { Request, Response } from 'express';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Paciente from '../typeorm/entities/Paciente';

interface IRequest {
	user_id: string;
}

interface IPctLista {
	id: number;
	nome: string;
	tipoAtendimento: number;
	logradouro: string;
}

class ShowAllPacienteService {
	public async execute({ user_id }: IRequest): Promise<IPctLista[]> {
		const pacienteRepo = getCustomRepository(PacienteRepository);

		const pacienteEncontrado = await pacienteRepo.findAllPacientes(user_id);

		if (!pacienteEncontrado) {
			throw new AppError('Nenhum paciente cadastrado', 404);
		}

		let pacienteLista = pacienteEncontrado.map(pct => ({
			id: pct.id,
			nome: pct.nome,
			tipoAtendimento: 1,
			logradouro: pct.logradouro,
		}));

		return pacienteLista;
	}
}
export default ShowAllPacienteService;
