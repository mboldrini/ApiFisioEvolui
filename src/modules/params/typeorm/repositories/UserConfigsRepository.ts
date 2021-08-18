import { EntityRepository, Repository } from 'typeorm';
import UserConfigs from '../entities/UserConfigs';

interface IRequest {
	atendimento_duracao: string;
	agenda_retroativo: number;
	evolucao_repetir: number;
	pagamento_valor: string;
}

@EntityRepository(UserConfigs)
export class UserConfigsRepository extends Repository<UserConfigs> {
	public async findByUid(uid: string): Promise<UserConfigs | undefined> {
		const user = await this.findOne({
			where: {
				uid,
			},
		});
		return user;
	}
}
export default UserConfigsRepository;
