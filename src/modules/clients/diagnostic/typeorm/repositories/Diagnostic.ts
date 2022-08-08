import { EntityRepository, Repository } from 'typeorm';
import Diagnostic from '../entities/Diagnostic';

interface IProps {
	user_id: number;
	client_id: number;
	start_date?: Date;
}

@EntityRepository(Diagnostic)
export class DiagnosticRepository extends Repository<Diagnostic> {
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
export default DiagnosticRepository;
