import { TipoAtendimentoRepository } from '../typeorm/repositories/TipoAtendimentoRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import TipoAtendimento from '../typeorm/entities/TipoAtendimento';

interface IRequest {
	id_tipo: number;
	tipo: string;
	valor_atendimento: number;
	descricao?: string;
	user_id: string;
}

interface IRetorno {
	mensagem: string;
}

class UpdateTipoAtendimentoService {
	public async execute({ id_tipo, tipo, valor_atendimento, descricao, user_id }: IRequest): Promise<IRetorno> {
		const tipoAtendimentoRepository = getCustomRepository(TipoAtendimentoRepository);

		const tipoAtendimento = await tipoAtendimentoRepository.findByIdAndUser({
			id: id_tipo,
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

		return { mensagem: 'ok' };
	}
}

export default UpdateTipoAtendimentoService;
