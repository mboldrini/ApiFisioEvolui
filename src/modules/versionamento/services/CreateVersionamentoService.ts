import { VersionamentoRepository } from './../typeorm/repositories/VersionamentoRepository';
import { UsersRepository } from '@modules/users/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import VersionamentoTypes from '../typeorm/entities/VersionamentoTypes';

interface IRequest {
	versao: string;
	novidades: string;
	data_publicacao?: Date;
	user_code: string;
}

class CreateVersionamentoService {
	public async execute({ versao, novidades, data_publicacao, user_code }: IRequest): Promise<VersionamentoTypes> {
		const usersRepo = getCustomRepository(UsersRepository);
		const versionamentoRepo = getCustomRepository(VersionamentoRepository);

		const userExist = await usersRepo.findOne({ user_code, email: 'equipeviciobr@gmail.com' });
		if (!userExist) throw new AppError("User don't exist", 404);

		const versaoObj = versionamentoRepo.create({
			versao,
			novidades,
			data_publicacao,
			liberado: true,
		});

		await versionamentoRepo.save(versaoObj);

		return versaoObj;
	}
}
export default CreateVersionamentoService;
