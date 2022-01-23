import { TipoAtendimentoRepository } from './../typeorm/repositories/TipoAtendimentoRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import TipoAtendimento from '../typeorm/entities/TipoAtendimento';

interface IRequest {
	id_tipo: string;
	tipo: string;
	valor_atendimento: number;
	descricao?: string;
	user_id: string;
}

class UpdateTipoAtendimentoService {
	public async execute({ id_tipo, tipo, valor_atendimento, descricao, user_id }: IRequest): Promise<TipoAtendimento> {
		const tipoAtendimentoRepository = getCustomRepository(TipoAtendimentoRepository);

		const tipoAtendimento = await tipoAtendimentoRepository.findByIdAndUser({
			tipo_id: id_tipo,
			user_id,
		});

		if (!tipoAtendimento) {
			throw new AppError('Tipo de atendimento não encontrado');
		}

		tipoAtendimento.tipo = tipo;
		tipoAtendimento.valor_atendimento = valor_atendimento;

		if (descricao) {
			tipoAtendimento.descricao = descricao;
		} else {
			tipoAtendimento.descricao = '';
		}

		await tipoAtendimentoRepository.save(tipoAtendimento);

		return tipoAtendimento;
	}
}

export default UpdateTipoAtendimentoService;
