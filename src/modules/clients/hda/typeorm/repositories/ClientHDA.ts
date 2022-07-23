import { EntityRepository, Repository } from 'typeorm';
import ClientHDA from '../entities/ClientHDA';

@EntityRepository(ClientHDA)
export class ClientHDARepository extends Repository<ClientHDA> {}
export default ClientHDARepository;
