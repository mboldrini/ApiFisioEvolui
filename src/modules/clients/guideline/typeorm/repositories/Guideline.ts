import { EntityRepository, Repository } from 'typeorm';
import ClientGuideline from '../entities/Guideline';

interface IProps {
	user_id: number;
	client_id: number;
	start_date?: Date;
}

@EntityRepository(ClientGuideline)
export class ClientGuidelineRepository extends Repository<ClientGuideline> {
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
export default ClientGuidelineRepository;
