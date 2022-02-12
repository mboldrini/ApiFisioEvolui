import { Between, EntityRepository, In, Repository } from 'typeorm';
import Evolucao from '../entities/Evolucoes';

interface IById {
	id: number;
	user_id: string;
	agendamento_id: number;
	paciente_id: number;
}

@EntityRepository(Evolucao)
export class EvolucaoRepository extends Repository<Evolucao> {
	public async findById({ id, agendamento_id, paciente_id, user_id }: IById): Promise<Evolucao | undefined> {
		const evolucao = await this.findOne({
			where: {
				id,
				user_id,
				agendamento_id,
				paciente_id,
				excluido: 0,
			},
		});
		return evolucao;
	}
}
