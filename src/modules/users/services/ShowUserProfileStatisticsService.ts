import { EvolucaoRepository } from './../../paciente_evolucoes/typeorm/repositories/EvolucoesRepository';
import { PacienteRepository } from './../../paciente/typeorm/repositories/PacienteRepository';
import { Request, Response } from 'express';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UsersRepository } from './../typeorm/repositories/UsersRepository';

interface IRequest {
	id: string;
}

class ShowUserProfileStatisticsService {
	public async execute({ id }: IRequest): Promise<Object> {
		const userRepo = getCustomRepository(UsersRepository);
		const userPatientsRepo = getCustomRepository(PacienteRepository);
		const userEvolucoesRepo = getCustomRepository(EvolucaoRepository);

		const user = await userRepo.findById(id);

		if (!user) {
			throw new AppError('Usuario não encontrado');
		}

		const qtdPacients = await userPatientsRepo.findAndCount({
			user_id: id,
			excluido: false,
		});

		const qtdAtendimentos = await userEvolucoesRepo.findAndCount({
			user_id: id,
			excluido: false,
		});

		const result = {
			qtdPacientes: qtdPacients[1],
			qtdAtendimentos: qtdAtendimentos[1],
		};

		return { result };
	}
}

export default ShowUserProfileStatisticsService;
