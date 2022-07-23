import { EntityRepository, Repository } from 'typeorm';
import Diagnostic from '../entities/Diagnostic';

@EntityRepository(Diagnostic)
export class DiagnosticRepository extends Repository<Diagnostic> {
	// public async findById(user_id: string): Promise<DiagnosticRepository | undefined> {
	// 	const user = await this.findOne({
	// 		where: {
	// 			user_id,
	// 		},
	// 	});
	// 	return user;
	// }
}
export default DiagnosticRepository;
