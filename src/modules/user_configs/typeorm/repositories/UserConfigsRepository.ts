import { EntityRepository, Repository } from 'typeorm';
import UserConfigs from '../entities/UserConfigs';

@EntityRepository(UserConfigs)
export class UserConfigsRepository extends Repository<UserConfigs> {
	public async findById(id: string): Promise<UserConfigs | undefined> {
		const user = await this.findOne({
			where: {
				id,
			},
		});
		return user;
	}
}
export default UserConfigsRepository;
