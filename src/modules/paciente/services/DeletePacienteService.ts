import { AgendamentoRepository } from './../../paciente_agendamento/typeorm/repositories/AgendamentoRepository';
import { PacienteRepository } from './../typeorm/repositories/PacienteRepository';
import { Request, Response } from 'express';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Paciente from '../typeorm/entities/Paciente';

interface IRequest {
	paciente_id: number;
	user_id: string;
}

class DeletePacienteService {
	public async execute({ paciente_id, user_id }: IRequest): Promise<Paciente> {
		const pacienteRepo = getCustomRepository(PacienteRepository);

		const pacienteEncontrado = await pacienteRepo.findByIdAndUser({
			id: paciente_id,
			user_id,
		});

		if (!pacienteEncontrado) {
			throw new AppError('Nenhum paciente cadastrado', 404);
		}

		pacienteEncontrado.excluido = true;

		await pacienteRepo.save(pacienteEncontrado);

		return pacienteEncontrado;
	}
}
export default DeletePacienteService;
