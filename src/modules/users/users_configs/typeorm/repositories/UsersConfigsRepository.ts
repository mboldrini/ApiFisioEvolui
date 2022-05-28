import { EntityRepository, Repository } from 'typeorm';
import UsersConfigs from '../entities/UsersConfigs';

@EntityRepository(UsersConfigs)
export class UsersConfigsRepository extends Repository<UsersConfigs> {}
export default UsersConfigsRepository;
