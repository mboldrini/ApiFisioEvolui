import { EntityRepository, Repository } from 'typeorm';
import User from '../entities/User';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
	public async findByUid(uid: string): Promise<User | undefined> {
		const user = this.findOne({
			where: {
				uid,
			},
		});
		return user;
	}

	public async findByEmail(email: string): Promise<User | undefined> {
		const user = this.findOne({
			where: {
				email,
			},
		});
		return user;
	}
}
export default UsersRepository;
