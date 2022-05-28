import { EntityRepository, Repository } from 'typeorm';
import UsersAddress from '../entities/UserAddress';

@EntityRepository(UsersAddress)
export class UsersAddressRepository extends Repository<UsersAddress> {}
export default UsersAddressRepository;
