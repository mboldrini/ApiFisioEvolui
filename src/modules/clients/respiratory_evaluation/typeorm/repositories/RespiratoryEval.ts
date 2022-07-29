import { EntityRepository, Repository } from 'typeorm';
import ClientRespiratoryEval from '../entities/RespiratoryEvatuation';

@EntityRepository(ClientRespiratoryEval)
export class ClientRespiratoryEvalRepository extends Repository<ClientRespiratoryEval> {}
export default ClientRespiratoryEvalRepository;
