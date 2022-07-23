import { EntityRepository, Repository } from 'typeorm';
import ClientFunctionalDiagnosis from '../entities/FuncionalDiagnosis';

@EntityRepository(ClientFunctionalDiagnosis)
export class ClientFunctionalDiagnosisRepository extends Repository<ClientFunctionalDiagnosis> {}
export default ClientFunctionalDiagnosisRepository;
