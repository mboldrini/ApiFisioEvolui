import { EntityRepository, Repository } from 'typeorm';
import ServicePayment from '../entities/ServicePayment';

@EntityRepository(ServicePayment)
export class ServicePaymentRepository extends Repository<ServicePayment> {}
export default ServicePaymentRepository;
