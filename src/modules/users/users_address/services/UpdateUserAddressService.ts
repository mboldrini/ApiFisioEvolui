import { UsersRepository } from '../../users/typeorm/repositories/UsersRepository';
import { UsersAddressRepository } from '../typeorm/repositories/UsersAddressRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersAddress from '../typeorm/entities/UserAddress';

interface IRequest {
	user_code: string;
	address: string;
	number: number;
	city: string;
	district: string;
	state: string;
	country: string;
}

class UpdateUsersAddressService {
	public async execute({
		user_code,
		address,
		number,
		city,
		district,
		state,
		country,
	}: IRequest): Promise<UsersAddress | Object> {
		const usersRepo = getCustomRepository(UsersRepository);
		const usersAddressRepo = getCustomRepository(UsersAddressRepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError("User don't exist", 404);

		const userAddressExists = await usersAddressRepo.findOne({ user_id: userExists.user_id });
		if (!userAddressExists) throw new AppError("Don't exist an address for this user", 404);

		userAddressExists.address = address;
		userAddressExists.number = number;
		userAddressExists.city = city;
		userAddressExists.district = district;
		userAddressExists.state = state;
		userAddressExists.country = country;

		await usersAddressRepo.save(userAddressExists);

		return userAddressExists;
	}
}
export default UpdateUsersAddressService;
