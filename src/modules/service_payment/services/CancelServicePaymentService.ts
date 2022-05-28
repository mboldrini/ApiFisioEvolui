import { ServicePaymentRepository } from './../typeorm/repositories/ServicePaymentRepository';
import UsersRepository from '@modules/users/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

interface IRequest {
	user_code: string;
	id: number;
	scheduled: boolean;
}

class CancelServicePaymentService {
	public async cancel({ user_code, id, scheduled }: IRequest): Promise<Object> {
		const userRepo = getCustomRepository(UsersRepository);
		const paymentServiceRepo = getCustomRepository(ServicePaymentRepository);

		const userExist = await userRepo.findOne({ user_code });
		if (!userExist) throw new AppError("This user don't exist", 404);

		const servicePaymentExist = await paymentServiceRepo.findOne({
			user_id: userExist.user_id,
			id,
		});
		if (!servicePaymentExist) throw new AppError("Don't exist an payment for this appointment");

		servicePaymentExist.scheduled = scheduled;

		await paymentServiceRepo.save(servicePaymentExist);

		return { message: 'ok' };
	}
}
export default CancelServicePaymentService;
