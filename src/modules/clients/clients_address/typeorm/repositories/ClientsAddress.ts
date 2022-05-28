import { EntityRepository, Repository } from 'typeorm';
import ClientsAddress from '../entities/ClientsAddress';

@EntityRepository(ClientsAddress)
export class ClientsAddressRepository extends Repository<ClientsAddress> {
	// public async findById(user_id: string): Promise<ClientsAddressRepository | undefined> {
	// 	const user = await this.findOne({
	// 		where: {
	// 			user_id,
	// 		},
	// 	});
	// 	return user;
	// }
}
export default ClientsAddressRepository;
