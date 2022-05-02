import { TipoAtendimentoRepository } from '../typeorm/repositories/TipoAtendimentoRepository';
import { Request, Response } from 'express';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import PacienteRepository from '@modules/paciente/typeorm/repositories/PacienteRepository';

interface IRequest {
	id: number;
	user_id: string;
}

interface IReturn {
	id: number;
	nome: string;
	valor: number;
	descricao: string;
	created_at: Date;
	updated_at: Date;
}

class ShowTipoAtendimentoService {
	public async execute({ id, user_id }: IRequest): Promise<IReturn> {
		const tipoAtendimentoRepository = getCustomRepository(TipoAtendimentoRepository);
		const pacientesRepo = getCustomRepository(PacienteRepository);

		const tipoAtendimento = await tipoAtendimentoRepository.findByIdAndUser({
			id,
			user_id,
		});

		if (!tipoAtendimento) {
			throw new AppError('Tipo de atendimento não encontrado');
		}

		const qtdPcts = await pacientesRepo.findAllByAtendimento({
			tipoAtendimento: tipoAtendimento.id,
			user_id,
		});

		let tipoAtendimentoInfos = {
			id: tipoAtendimento.id,
			nome: tipoAtendimento.tipo,
			valor: tipoAtendimento.valor_atendimento,
			descricao: tipoAtendimento.descricao,
			created_at: tipoAtendimento.created_at,
			updated_at: tipoAtendimento.updated_at,
			qtdPacientes: qtdPcts[1],
		};

		return tipoAtendimentoInfos;
	}
}

export default ShowTipoAtendimentoService;
