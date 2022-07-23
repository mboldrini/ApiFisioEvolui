import { EntityRepository, Repository } from 'typeorm';
import ClientHPP from '../entities/ClientHPP';

@EntityRepository(ClientHPP)
export class ClientHPPRepository extends Repository<ClientHPP> {}
export default ClientHPPRepository;
