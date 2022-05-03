import AppError from '@shared/errors/AppError';
import { TipoAtendimentoRepository } from '../typeorm/repositories/TipoAtendimentoRepository';
import { getCustomRepository } from 'typeorm';
import TipoAtendimento from '../typeorm/entities/TipoAtendimento';

interface IRequest {
	tipo: string;
	valor_atendimento: number;
	descricao?: string;
	user_id: string;
}

interface IRetorno {
	mensagem: string;
}

class CreateTipoAtendimentoService {
	public async execute({ tipo, valor_atendimento, descricao, user_id }: IRequest): Promise<IRetorno> {
		const tipoAtendimento = getCustomRepository(TipoAtendimentoRepository);

		const tipoAtendimentoExiste = await tipoAtendimento.findOne({
			tipo,
			user_id,
			excluido: false,
		});

		if (tipoAtendimentoExiste) {
			throw new AppError('Tipo de atendimento já existe');
		}

		const tipoAtendimentoCriado = await tipoAtendimento.create({
			tipo,
			valor_atendimento,
			descricao,
			excluido: false,
			user_id,
		});

		await tipoAtendimento.save(tipoAtendimentoCriado);

		return { mensagem: 'ok' };
	}
}

export default CreateTipoAtendimentoService;
