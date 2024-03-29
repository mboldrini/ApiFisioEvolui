import { PaymentMethodUserRepository } from './../../../payment_method/paymentMethod_user/typeorm/repositories/PaymentMethodUserRepository';
import { PaymentMethodRepository } from './../../../payment_method/payment_method/typeorm/repositories/PaymentMethodRepository';
import { ServicesTypesRepository } from './../../../services_types/typeorm/repositories/ServicesTypesRepository';
import { UsersInfosRepository } from './../../users_infos/typeorm/repositories/UsersInfosRepository';
import { UsersConfigsRepository } from './../../users_configs/typeorm/repositories/UsersConfigsRepository';
import { number } from 'joi';
import { UsersAddressRepository } from './../../users_address/typeorm/repositories/UsersAddressRepository';
import { TIMEZONE_LANGUAGE, TIMEZONE_LOCALE } from '../../../../shared/DTO';
import { Request, Response } from 'express';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
	user_code: string;
}

class ShowUserService {
	public async execute({ user_code }: IRequest): Promise<Object> {
		const userRepository = getCustomRepository(UsersRepository);
		const userAddressRepo = getCustomRepository(UsersAddressRepository);
		const userConfigsRepo = getCustomRepository(UsersConfigsRepository);
		const userInfosRepo = getCustomRepository(UsersInfosRepository);
		const serviceTypesRepo = getCustomRepository(ServicesTypesRepository);
		const paymentTypeRepo = getCustomRepository(PaymentMethodUserRepository);

		const user = await userRepository.findOne({ user_code });
		if (!user) throw new AppError("This user don't exist");

		const userAddress = await userAddressRepo.findOne({ user_id: user.user_id });
		const userAddressMap = {
			address: userAddress?.address,
			number: userAddress?.number,
			city: userAddress?.city,
			district: userAddress?.district,
			state: userAddress?.state,
			country: userAddress?.country,
		};

		const userConfigs = await userConfigsRepo.findOne({ user_id: user.user_id });
		const userConfigsMap = {
			allow_retroactiveDate: userConfigs?.allow_retroactiveDate,
			allow_notifications: userConfigs?.allow_notifications,
			schedule_startDay: userConfigs?.schedule_startDay,
			user_premium: userConfigs?.user_premium,
			premium_type: userConfigs?.premium_type,
			premium_until: userConfigs?.premium_until.toLocaleString(TIMEZONE_LANGUAGE),
		};

		const userInfosExist = await userInfosRepo.findOne({ user_id: user.user_id });
		const userInfosMap = {
			description: userInfosExist?.description,
			professional_mail: userInfosExist?.professional_mail,
			celphone: userInfosExist?.celphone,
			second_celphone: userInfosExist?.second_celphone,
			website: userInfosExist?.website,
			instagram: userInfosExist?.instagram,
			twitter: userInfosExist?.twitter,
			tiktok: userInfosExist?.tiktok,
		};

		const servicesTypeList = await serviceTypesRepo.find({ user_id: user.user_id });
		let newServicesTypeList = servicesTypeList.map(service => ({
			id: service.id,
			name: service.name,
			description: service.description,
			duration: service.duration,
			price: service.price,
			created_at: service.created_at,
			updated_at: service.updated_at,
		}));
		const paymentMethodList = await paymentTypeRepo.find({ user_id: user.user_id });

		let mapUser = {
			user_code: user.user_code,
			name: user.name,
			family_name: user.family_name,
			given_name: user.given_name,
			picture: user.picture,
			email: user.email,
			enabled: user.enabled,
			created_at: user.created_at.toLocaleString(TIMEZONE_LANGUAGE, TIMEZONE_LOCALE),
			address: userAddressMap,
			configs: userConfigsMap,
			personal_infos: userInfosMap,
			serviceType: newServicesTypeList,
			paymentMethod: paymentMethodList,
		};

		return mapUser;
	}
}

export default ShowUserService;
