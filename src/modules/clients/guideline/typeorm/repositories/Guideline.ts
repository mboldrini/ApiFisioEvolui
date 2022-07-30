import { EntityRepository, Repository } from 'typeorm';
import ClientGuideline from '../entities/Guideline';

@EntityRepository(ClientGuideline)
export class ClientGuidelineRepository extends Repository<ClientGuideline> {}
export default ClientGuidelineRepository;
