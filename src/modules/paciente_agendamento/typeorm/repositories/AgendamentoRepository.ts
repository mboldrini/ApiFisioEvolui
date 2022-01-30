import { EntityRepository, In, Repository } from 'typeorm';
import Agendamento from '../entities/Agendamento';

interface ITipo {
	id: number;
	user_id: string;
}

interface ITipo2 {
	dataHora: string;
	user_id: string;
}

interface IFindAgendamentos {
	dataHora: string;
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
	public async findByDataHoraAndUser({ dataHora, user_id }: ITipo2): Promise<Agendamento | undefined> {
		const agendamento = await this.findOne({
			where: {
				dataHora,
				user_id,
			},
		});
		return agendamento;
	}

	public async findAllByIds(agendamentos: IFindAgendamentos[], user_id: string): Promise<Agendamento[]> {
		const agendamentosIds = agendamentos.map(agendamento => agendamento.dataHora);

		const existentAgendamentos = await this.find({
			where: {
				dataHora: In(agendamentosIds),
				user_id,
			},
		});

		console.log(existentAgendamentos);

		return existentAgendamentos;
	}
}
export default AgendamentoRepository;
