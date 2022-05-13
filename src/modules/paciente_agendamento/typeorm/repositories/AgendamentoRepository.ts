import { Between, EntityRepository, In, Repository } from 'typeorm';
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
	// data: string;
	// hora: number;
	timestamp: number;
	tipo: number;
	status: number;
}

interface IDateRange {
	dataInicio: Date;
	dataFim: Date;
	user_id: string;
	paciente_id?: number;
}

interface IDataHora {
	dataInicio: Date;
	dataFim: Date;
	user_id: string;
}

@EntityRepository(Agendamento)
export class AgendamentoRepository extends Repository<Agendamento> {
	public async findByIdUser({ id, user_id }: ITipo): Promise<Agendamento | undefined> {
		const agendamento = await this.findOne({
			where: {
				id,
				user_id,
				excluido: false,
			},
		});
		return agendamento;
	}

	public async findAllByIdAndUser({ id, user_id }: ITipo): Promise<Agendamento[] | undefined> {
		const agendamento = await this.find({
			where: {
				paciente_id: id,
				user_id,
				excluido: false,
			},
		});
		return agendamento;
	}

	public async findByDataHoraAndUser({ dataHora, user_id }: ITipo2): Promise<Agendamento | undefined> {
		const agendamento = await this.findOne({
			where: {
				dataHora,
				user_id,
				excluido: false,
			},
		});
		return agendamento;
	}

	public async findByDataHora({ dataInicio, dataFim, user_id }: IDataHora): Promise<Agendamento | undefined> {
		const agendamento = await this.findOne({
			where: {
				data: Between(dataInicio, dataFim),
				user_id,
				excluido: false,
			},
		});
		return agendamento;
	}

	public async findAllByIds(agendamentos: IFindAgendamentos[], user_id: string): Promise<Agendamento[]> {
		// const agendamentosIds = agendamentos.map(agendamento => agendamento.data);
		// const agendamentoHora = agendamentos.map(agendamento => agendamento.hora);
		const agendamentoTimeStamp = agendamentos.map(agendamento => agendamento.timestamp);

		const existentAgendamentos = await this.find({
			where: {
				// data: In(agendamentosIds),
				// hora: In(agendamentoHora),
				dataHora: In(agendamentoTimeStamp),
				user_id,
				excluido: false,
			},
		});

		return existentAgendamentos;
	}

	public async findByDataRangeAndUser({
		dataInicio,
		dataFim,
		paciente_id,
		user_id,
	}: IDateRange): Promise<Agendamento[] | undefined> {
		const agendamento = await this.find({
			where: {
				data: Between(dataInicio, dataFim),
				paciente_id,
				user_id,
				excluido: false,
			},
		});
		return agendamento;
	}

	public async findByDataRange({ dataInicio, dataFim, user_id }: IDateRange): Promise<Agendamento[] | undefined> {
		const agendamento = await this.find({
			where: {
				data: Between(dataInicio, dataFim),
				user_id,
				excluido: false,
			},
			order: {
				hora: 'ASC',
			},
		});
		return agendamento;
	}
}
export default AgendamentoRepository;
