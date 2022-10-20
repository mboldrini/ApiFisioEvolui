import { EntityRepository, Repository } from 'typeorm';
import User from '../entities/User';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
	public async findById(user_code: string): Promise<User | undefined> {
		const user = await this.findOne({
			where: {
				user_code,
				enabled: true,
			},
		});
		return user;
	}

	public async findByEmail(email: string): Promise<User | undefined> {
		const user = await this.findOne({
			where: {
				email,
				enabled: true,
			},
		});
		return user;
	}
}
export default UsersRepository;
