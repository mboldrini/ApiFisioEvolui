import { EntityRepository, Repository } from 'typeorm';
import PacientePagamentos from '../entities/PacientePagamentos';

@EntityRepository(PacientePagamentos)
export class PacientePagamentosRepository extends Repository<PacientePagamentos> {
	// public async findByIdAndUser({ tipo_id, user_id }: ITipoPesquisa): Promise<TipoAtendimento | undefined> {
	// 	const atendimento = await this.findOne({
	// 		where: {
	// 			id: tipo_id,
	// 			user_id,
	// 			excluido: false,
	// 		},
	// 	});
	// 	return atendimento;
	// }
}
export default PacientePagamentosRepository;
