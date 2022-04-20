import { TipoAtendimentoRepository } from './../../paciente_tipoAtendimento/typeorm/repositories/TipoAtendimentoRepository';
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
	tipoAtendimento: string | undefined;
	logradouro: string;
}

class ShowAllPacienteService {
	public async execute({ user_id }: IRequest): Promise<IPctLista[]> {
		const pacienteRepo = getCustomRepository(PacienteRepository);
		const tipoAtendimentoRepo = getCustomRepository(TipoAtendimentoRepository);

		const pacienteEncontrado = await pacienteRepo.findAllPacientes(user_id);

		if (!pacienteEncontrado) {
			throw new AppError('Nenhum paciente cadastrado', 404);
		}

		const tipoAtendimentos = await tipoAtendimentoRepo.findAll({ user_id });
		if (tipoAtendimentos?.length < 1) {
			throw new AppError('Nenhum tipo de atendimento cadastrado', 404);
		}

		let pacienteLista = pacienteEncontrado.map(pct => ({
			id: pct.id,
			nome: pct.nome,
			tipoAtendimento: tipoAtendimentos
				?.filter(tipo => {
					if (tipo.id == pct.tipoAtendimento) {
						return tipo.tipo;
					}
				})
				.map(tipo => {
					return tipo.tipo;
				})[0],
			logradouro: pct.logradouro,
		}));

		return pacienteLista;
	}
}
export default ShowAllPacienteService;
