import { EntityRepository, Repository } from 'typeorm';
import ClientObjectives from '../entities/ClientObjectives';

interface IProps {
	user_id: number;
	client_id: number;
	start_date?: Date;
}

@EntityRepository(ClientObjectives)
export class ClientObjectivesRepository extends Repository<ClientObjectives> {
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
export default ClientObjectivesRepository;
