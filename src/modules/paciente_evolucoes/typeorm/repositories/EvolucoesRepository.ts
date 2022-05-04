import { Between, EntityRepository, In, Repository } from 'typeorm';
import Evolucao from '../entities/Evolucoes';

interface IById {
	id: number;
	user_id: string;
	agendamento_id: number;
	paciente_id: number;
}

interface IByOneId {
	id: number;
	user_id: string;
}

interface IFindAll {
	paciente_id: number;
	user_id: string;
}

interface IEvolucao {
	id: number;
	evolucao: string;
	observacoes: string;
	status: number;
	tipo?: number;
	agendamento_id: number;
	paciente_id: number;
	user_id: string;
	excluido?: boolean;
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

	public async findOneById({ id, user_id }: IByOneId): Promise<Evolucao | undefined> {
		const evolucao = await this.findOne({
			where: {
				id,
				user_id,
				excluido: false,
			},
		});
		return evolucao;
	}

	public async findOneByAgendamentoId({ id, user_id }: IByOneId): Promise<Evolucao | undefined> {
		const evolucao = await this.findOne({
			where: {
				agendamento_id: id,
				user_id,
				excluido: false,
			},
		});
		return evolucao;
	}

	public async findAll({ paciente_id, user_id }: IFindAll): Promise<IEvolucao[] | undefined> {
		const evolucoes = await this.find({
			where: {
				user_id,
				paciente_id,
				excluido: 0,
			},
		});
		return evolucoes;
	}
}
