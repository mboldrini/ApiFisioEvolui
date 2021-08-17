import { EntityRepository, Repository } from 'typeorm';
import UserParams from '../entities/UserParams';

interface IRequest {
	atendimento_duracao: string;
	agenda_retroativo: number;
	evolucao_repetir: number;
	pagamento_valor: string;
}

@EntityRepository(UserParams)
export class UserParamsRepository extends Repository<UserParams> {
	public async findByUid(uid: string): Promise<UserParams | undefined> {
		const user = await this.findOne({
			where: {
				uid,
			},
		});
		return user;
	}
}
export default UserParamsRepository;
