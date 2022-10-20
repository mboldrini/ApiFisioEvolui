import { VersionamentoRepository } from './../typeorm/repositories/VersionamentoRepository';
import { UsersRepository } from '@modules/users/users/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

interface IRequest {
	user_code: string;
}

class ListaVersoesService {
	public async execute({ user_code }: IRequest): Promise<any> {
		const usersRepo = getCustomRepository(UsersRepository);
		const versionamentoRepo = getCustomRepository(VersionamentoRepository);

		const userExist = await usersRepo.findOne({ user_code, email: 'equipeviciobr@gmail.com' });
		if (!userExist) throw new AppError("User don't exist", 404);

		const versaoObj = await versionamentoRepo.find({ liberado: true });

		const novoRetorno = versaoObj.map(versao => ({
			id: versao.id,
			versao: versao.versao,
			novidades: versao.novidades,
			data_publicacao: versao.data_publicacao,
		}));

		return novoRetorno;
	}
}
export default ListaVersoesService;
