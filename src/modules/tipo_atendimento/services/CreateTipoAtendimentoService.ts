import AppError from '@shared/errors/AppError';
import { TipoAtendimentoRepository } from './../typeorm/repositories/TipoAtendimentoRepository';
import { getCustomRepository } from 'typeorm';
import TipoAtendimento from '../typeorm/entities/TipoAtendimento';

interface IRequest {
	tipo: string;
	valor_atendimento: number;
	descricao?: string;
	user_id: string;
}

class CreateTipoAtendimentoService {
	public async execute({ tipo, valor_atendimento, descricao, user_id }: IRequest): Promise<TipoAtendimento> {
		const tipoAtendimento = getCustomRepository(TipoAtendimentoRepository);

		const tipoAtendimentoExiste = await tipoAtendimento.findOne({
			tipo,
			user_id, // adicionado dia 29/01/2022 - se n funcionar, é por isso
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

		return tipoAtendimentoCriado;
	}
}

export default CreateTipoAtendimentoService;
