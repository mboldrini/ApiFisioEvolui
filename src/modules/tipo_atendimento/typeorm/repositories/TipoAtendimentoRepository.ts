import { EntityRepository, Repository } from 'typeorm';
import TipoAtendimento from '../entities/TipoAtendimento';

interface IRequest {
	tipo: string;
	valor_atendimento: number;
	descricao: number;
	excluido?: boolean;
	user_id: string;
}

interface ITipoPesquisa {
	tipo_id: number;
	user_id: string;
}

@EntityRepository(TipoAtendimento)
export class TipoAtendimentoRepository extends Repository<TipoAtendimento> {
	public async findByIdAndUser({ tipo_id, user_id }: ITipoPesquisa): Promise<TipoAtendimento | undefined> {
		const atendimento = await this.findOne({
			where: {
				id: tipo_id,
				user_id,
			},
		});
		return atendimento;
	}
}
export default TipoAtendimentoRepository;
