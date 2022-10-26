import { UsersRepository } from '../../users/typeorm/repositories/UsersRepository';
import { UsersAddressRepository } from '../typeorm/repositories/UsersAddressRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersAddress from '../typeorm/entities/UserAddress';

interface IRequest {
	user_code: string;
	address?: string;
	number?: number;
	city?: string;
	district?: string;
	state?: string;
	country?: string;
}

class CreateUsersAddressService {
	public async execute({
		user_code,
		address,
		number,
		city,
		district,
		state,
		country,
	}: IRequest): Promise<UsersAddress> {
		const usersRepo = getCustomRepository(UsersRepository);
		const usersAddressRepo = getCustomRepository(UsersAddressRepository);

		const userExists = await usersRepo.findOne({ user_code });
		if (!userExists) throw new AppError('Usuário não encontrado - usraddress', 404);
		if (!userExists.enabled) throw new AppError('This User is deactivated', 404);

		const userAddressExists = await usersAddressRepo.findOne({ user_id: userExists.user_id });
		if (userAddressExists) throw new AppError('Already exist a address for this user', 404);

		const userAddress = usersAddressRepo.create({
			address,
			number,
			city,
			district,
			state,
			country,
			user_id: userExists.user_id,
		});

		await usersAddressRepo.save(userAddress);

		return userAddress;
	}
}
export default CreateUsersAddressService;
