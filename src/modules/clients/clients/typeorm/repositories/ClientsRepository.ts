import { EntityRepository, Repository } from 'typeorm';
import Clients from '../entities/Clients';

@EntityRepository(Clients)
export class ClientsRepository extends Repository<Clients> {}
export default ClientsRepository;
