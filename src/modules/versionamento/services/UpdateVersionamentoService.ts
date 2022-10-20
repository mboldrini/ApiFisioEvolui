import { VersionamentoRepository } from './../typeorm/repositories/VersionamentoRepository';
import { UsersRepository } from '@modules/users/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

interface IRequest {
	id: number;
	versao?: string;
	novidades?: string;
	data_publicacao?: Date;
	liberado: boolean;
	user_code: string;
}

class UpdateVersionService {
	public async execute({ id, versao, novidades, data_publicacao, liberado, user_code }: IRequest): Promise<any> {
		const usersRepo = getCustomRepository(UsersRepository);
		const versionamentoRepo = getCustomRepository(VersionamentoRepository);

		const userExist = await usersRepo.findOne({ user_code, email: 'equipeviciobr@gmail.com' });
		if (!userExist) throw new AppError("User don't exist", 404);

		const versaoObj = await versionamentoRepo.findOne({ id });
		if (!versaoObj) throw new AppError('Versão não encontrada', 404);

		if (versao) {
			versaoObj.versao = versao;
		}
		if (novidades) {
			versaoObj.novidades = novidades;
		}
		if (liberado) {
			versaoObj.liberado = liberado;
		}
		if (data_publicacao) {
			versaoObj.data_publicacao = data_publicacao;
		}

		await versionamentoRepo.save(versaoObj);

		return versaoObj;
	}
}
export default UpdateVersionService;
