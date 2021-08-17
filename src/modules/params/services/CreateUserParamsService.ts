import { UserParamsRepository } from './../typeorm/repositories/UserParamsRepository';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import UserParams from '../typeorm/entities/UserParams';
import User from '@modules/users/typeorm/entities/User';
import { Request, Response } from 'express';

interface IRequest {
	atendimento_duracao: string;
	agenda_retroativo: number;
	evolucao_repetir: number;
	pagamento_valor: string;
	uid_user: User;
}

class CreateUserParamsService {
	public async execute({
		atendimento_duracao,
		agenda_retroativo,
		evolucao_repetir,
		pagamento_valor,
	}: IRequest): Promise<UserParams> {
		const userParamsRepository = getCustomRepository(UserParamsRepository);

		const userParams = await userParamsRepository.create({
			atendimento_duracao,
			agenda_retroativo,
			evolucao_repetir,
			pagamento_valor,
		});

		await userParamsRepository.save(userParams);

		return userParams;
	}
}
export default CreateUserParamsService;
