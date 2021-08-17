import { UserParamsRepository } from './../typeorm/repositories/UserParamsRepository';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import UserParams from '../typeorm/entities/UserParams';

interface IRequest {
	atendimento_duracao: string;
	agenda_retroativo: number;
	evolucao_repetir: number;
	pagamento_valor: string;
}

class CreateUserParamsService {
	public async execute({
		atendimento_duracao,
		agenda_retroativo,
		evolucao_repetir,
		pagamento_valor,
	}: IRequest): Promise<UserParams> {
		const userParamsRepository = getCustomRepository(UserParamsRepository);

		const userParams = userParamsRepository.create({
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
