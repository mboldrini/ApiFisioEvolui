import { EntityRepository, Repository } from 'typeorm';
import Clients from '../entities/Clients';

@EntityRepository(Clients)
export class ClientsRepository extends Repository<Clients> {
	// public async findById(user_id: string): Promise<Clients | undefined> {
	// 	const user = await this.findOne({
	// 		where: {
	// 			user_id,
	// 		},
	// 	});
	// 	return user;
	// }
}
export default ClientsRepository;
