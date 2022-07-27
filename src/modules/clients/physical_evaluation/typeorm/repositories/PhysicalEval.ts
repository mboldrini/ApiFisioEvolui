import { EntityRepository, Repository } from 'typeorm';
import ClientPhysicalEval from '../entities/PhysicalEvaluation';

@EntityRepository(ClientPhysicalEval)
export class ClientPhysicalEvalRepository extends Repository<ClientPhysicalEval> {}
export default ClientPhysicalEvalRepository;
