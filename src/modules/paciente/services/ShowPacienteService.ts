import { PacienteRepository } from './../typeorm/repositories/PacienteRepository';
import { Request, Response } from 'express';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Paciente from '../typeorm/entities/Paciente';

interface IRequest {
	id: number;
	user_id: string;
}

class ShowPacienteService {
	public async execute({ id, user_id }: IRequest): Promise<Paciente> {
		const pacienteRepo = getCustomRepository(PacienteRepository);

		const pacienteEncontrado = await pacienteRepo.findByIdAndUser({
			id,
			user_id,
		});

		if (!pacienteEncontrado) {
			throw new AppError('Paciente não encontrado', 404);
		}

		if (pacienteEncontrado.excluido == 1) {
			throw new AppError('Paciente excluído', 404);
		}

		return pacienteEncontrado;
	}
}
export default ShowPacienteService;
