import { EntityRepository, Repository } from 'typeorm';
import Versionamento from '../entities/VersionamentoTypes';

@EntityRepository(Versionamento)
export class VersionamentoRepository extends Repository<Versionamento> {
	public async findLastVersion(): Promise<Versionamento | undefined> {
		const payment = await this.findOne({
			where: {
				liberado: true,
			},
			order: {
				created_at: 'DESC',
				versao: 'ASC',
				id: 'DESC',
			},
		});
		return payment;
	}
}
export default VersionamentoRepository;
