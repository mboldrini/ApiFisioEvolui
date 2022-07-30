import { EntityRepository, Repository } from 'typeorm';
import ClientObjectives from '../entities/ClientObjectives';

@EntityRepository(ClientObjectives)
export class ClientObjectivesRepository extends Repository<ClientObjectives> {}
export default ClientObjectivesRepository;
