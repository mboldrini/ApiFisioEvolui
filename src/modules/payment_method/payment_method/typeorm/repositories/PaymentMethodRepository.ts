import { EntityRepository, Repository } from 'typeorm';
import PaymentMethod from '../entities/PaymentMethod';

@EntityRepository(PaymentMethod)
export class PaymentMethodRepository extends Repository<PaymentMethod> {}
export default PaymentMethodRepository;
