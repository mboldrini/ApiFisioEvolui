import { EntityRepository, Repository } from 'typeorm';
import UsersInfos from '../entities/UsersInfos';

@EntityRepository(UsersInfos)
export class UsersInfosRepository extends Repository<UsersInfos> {
	// public async findById(user_id: string): Promise<UsersInfos | undefined> {
	// 	const user = await this.findOne({
	// 		where: {
	// 			user_id,
	// 		},
	// 	});
	// 	return user;
	// }
}
export default UsersInfosRepository;
