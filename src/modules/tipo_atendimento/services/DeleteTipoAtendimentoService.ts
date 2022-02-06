import { PacienteRepository } from './../../paciente/typeorm/repositories/PacienteRepository';
import { TipoAtendimentoRepository } from './../typeorm/repositories/TipoAtendimentoRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import TipoAtendimento from '../typeorm/entities/TipoAtendimento';

interface IRequest {
	id: number;
	user_id: string;
}

class DeleteTipoAtendimentoService {
	public async execute({ id, user_id }: IRequest): Promise<TipoAtendimento> {
		const tipoAtendimentoRepository = getCustomRepository(TipoAtendimentoRepository);
		const pacienteRepository = getCustomRepository(PacienteRepository);

		const number_id = Number(id);

		const tipoAtendimento = await tipoAtendimentoRepository.findByIdAndUser({
			tipo_id: number_id,
			user_id,
		});

		if (!tipoAtendimento) {
			throw new AppError('Tipo de atendimento não encontrado');
		}

		const atendimentosEmPcts = await pacienteRepository.findAllByAtendimento({
			tipoAtendimento: id,
			user_id,
		});

		if (atendimentosEmPcts.length > 0) {
			throw new AppError(
				`Não é possivel excluir o tipo de agendamento, existe ${atendimentosEmPcts.length} usuário(s) cadastrado(s) com esse tipo de atendimento`,
				403,
			);
		}

		tipoAtendimento.excluido = true;

		await tipoAtendimentoRepository.save(tipoAtendimento);

		return tipoAtendimento;
	}
}

export default DeleteTipoAtendimentoService;
