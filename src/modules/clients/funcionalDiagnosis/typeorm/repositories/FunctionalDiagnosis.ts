import { EntityRepository, Repository } from 'typeorm';
import ClientFunctionalDiagnosis from '../entities/FuncionalDiagnosis';

interface IProps {
	user_id: number;
	client_id: number;
	start_date?: Date;
}

@EntityRepository(ClientFunctionalDiagnosis)
export class ClientFunctionalDiagnosisRepository extends Repository<ClientFunctionalDiagnosis> {
	public async findOrderBy({ user_id, client_id }: IProps): Promise<any | undefined> {
		const diagnostic = await this.find({
			where: {
				user_id,
				client_id,
			},
			order: {
				date: 'ASC',
			},
			take: 3,
		});
		return diagnostic;
	}
}
export default ClientFunctionalDiagnosisRepository;
