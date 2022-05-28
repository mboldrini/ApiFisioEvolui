import { UsersRepository } from '../../users/typeorm/repositories/UsersRepository';
import { TIMEZONE_LANGUAGE, TIMEZONE_LOCALE } from '../../../../shared/DTO';
import { UsersAddressRepository } from '../typeorm/repositories/UsersAddressRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersAddress from '../typeorm/entities/UserAddress';

interface IRequest {
	user_code: string;
}

class GetUsersAddressService {
	public async execute({ user_code }: IRequest): Promise<UsersAddress | Object> {
		const usersRepo = getCustomRepository(UsersRepository);
		const usersAddressRepo = getCustomRepository(UsersAddressRepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError("User don't exist", 404);

		let userAddressExists = await usersAddressRepo.findOne({ user_id: userExists.user_id });
		if (!userAddressExists) throw new AppError("Don't exist an address for this user", 404);

		const address = {
			address: userAddressExists.address,
			number: userAddressExists.number,
			city: userAddressExists.city,
			district: userAddressExists.district,
			state: userAddressExists.state,
			country: userAddressExists.country,
			created_at: userAddressExists.created_at.toLocaleString(TIMEZONE_LANGUAGE),
			updated_at: userAddressExists.updated_at.toLocaleString(TIMEZONE_LANGUAGE),
		};

		return address;
	}
}
export default GetUsersAddressService;
