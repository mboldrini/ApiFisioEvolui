import { EntityRepository, Repository } from 'typeorm';
import Agendamento from '../entities/Agendamento';

interface ITipo {
	id: number;
	user_id: string;
}

@EntityRepository(Agendamento)
export class AgendamentoRepository extends Repository<Agendamento> {
	public async findByIdUser({ id, user_id }: ITipo): Promise<Agendamento | undefined> {
		const agendamento = await this.findOne({
			where: {
				id,
				user_id,
			},
		});
		return agendamento;
	}
}
export default AgendamentoRepository;
