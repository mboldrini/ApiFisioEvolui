import { EntityRepository, Repository, Between } from 'typeorm';
import Complaint from '../entities/Complaint';

interface IProps {
	user_id: number;
	client_id: number;
	start_date?: Date;
}

@EntityRepository(Complaint)
export class ComplaintRepository extends Repository<Complaint> {
	public async findOrderBy({ user_id, client_id }: IProps): Promise<any | undefined> {
		const complaint = await this.find({
			where: {
				user_id,
				client_id,
			},
			order: {
				date: 'ASC',
			},
			take: 3,
		});
		return complaint;
	}
}
export default ComplaintRepository;
