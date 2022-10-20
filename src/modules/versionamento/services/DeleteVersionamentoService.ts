import { VersionamentoRepository } from './../typeorm/repositories/VersionamentoRepository';
import { UsersRepository } from '@modules/users/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

interface IRequest {
	id: number;
	user_code: string;
}

class DeleteVersionamentoService {
	public async execute({ id, user_code }: IRequest): Promise<any> {
		const usersRepo = getCustomRepository(UsersRepository);
		const versionamentoRepo = getCustomRepository(VersionamentoRepository);

		const userExist = await usersRepo.findOne({ user_code, email: 'equipeviciobr@gmail.com' });
		if (!userExist) throw new AppError("User don't exist", 404);

		const versaoObj = await versionamentoRepo.findOne({ id });
		if (!versaoObj) throw new AppError('Versão não encontrada', 404);

		await versionamentoRepo.delete(versaoObj);

		return { message: 'ok' };
	}
}
export default DeleteVersionamentoService;
