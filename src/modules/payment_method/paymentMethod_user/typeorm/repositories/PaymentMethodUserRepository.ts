import { EntityRepository, Repository } from 'typeorm';
import PaymentMethodUser from '../entities/PaymentMethodUser';

@EntityRepository(PaymentMethodUser)
export class PaymentMethodUserRepository extends Repository<PaymentMethodUser> {
	// public async findById(id: number): Promise<PaymentMethodUser | undefined> {
	// 	const payment = await this.findOne({
	// 		where: {
	// 			id: id,
	// 		},
	// 	});
	// 	return payment;
	// }
}
export default PaymentMethodUserRepository;
