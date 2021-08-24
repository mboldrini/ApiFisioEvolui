import User from '@modules/users/typeorm/entities/User';
import { EntityRepository, Repository } from 'typeorm';
import UserAgenda from '../entities/UserAgenda';

@EntityRepository(UserAgenda)
export class UserAgendaRepository extends Repository<UserAgenda> {
	public async findByUid(uid: string): Promise<UserAgenda | undefined> {
		const user = await this.findOne({
			where: {
				user_uid: uid,
			},
		});
		return user;
	}

	public async findAllAgendaByUid(uid: string): Promise<UserAgenda[] | undefined> {
		const userAgenda = await this.find({
			where: {
				user_uid: uid,
			},
		});
		return userAgenda;
	}
}

export default UserAgendaRepository;
