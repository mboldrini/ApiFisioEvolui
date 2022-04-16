import { EntityRepository, Repository } from 'typeorm';
import PacientePagamentos from '../entities/PacientePagamentos';

interface IFindById {
	id: number;
	user_id: string;
}

@EntityRepository(PacientePagamentos)
export class PacientePagamentosRepository extends Repository<PacientePagamentos> {
	public async findByIdAndUser({ id, user_id }: IFindById): Promise<PacientePagamentos | undefined> {
		const pagamento = await this.findOne({
			where: {
				id,
				user_id,
				excluido: false,
			},
		});
		return pagamento;
	}
}
export default PacientePagamentosRepository;
