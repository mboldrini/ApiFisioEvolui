import { EntityRepository, Repository } from 'typeorm';
import Complaint from '../entities/Complaint';

@EntityRepository(Complaint)
export class ComplaintRepository extends Repository<Complaint> {}
export default ComplaintRepository;
