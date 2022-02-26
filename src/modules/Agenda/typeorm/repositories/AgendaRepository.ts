import { Between, EntityRepository, In, Repository } from 'typeorm';
import Agenda from '../entities/Agenda';

interface IDataHora {
	dataInicio: Date;
	dataFim: Date;
	user_id: string;
}

@EntityRepository(Agenda)
export class AgendaRepository extends Repository<Agenda> {
	public async findByDataHora({ dataInicio, dataFim, user_id }: IDataHora): Promise<Agenda[] | undefined> {
		const agendamento = await this.find({
			where: {
				data: Between(dataInicio, dataFim),
				user_id,
				excluido: false,
			},
			order: {
				dataHora: 'ASC',
			},
		});
		return agendamento;
	}
	public async findByUid(user_id: string): Promise<Agenda | undefined> {
		const agendamento = await this.findOneOrFail({
			where: {
				user_id,
				excluido: false,
			},
		});
		return agendamento;
	}
}
export default AgendaRepository;
