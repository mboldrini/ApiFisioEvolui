import { EntityRepository, Repository } from 'typeorm';
import UserWorkDays from '../entities/UserWorkDays';

@EntityRepository(UserWorkDays)
export class UserWorkDaysRepository extends Repository<UserWorkDays> {}
export default UserWorkDaysRepository;
