import { EntityRepository, Repository } from 'typeorm';
import PacienteAgenda from '../entities/PacienteAgenda';

interface IRequest {
	dia_semana: number;
	data_agendamento: Date;
	horario: number;
	recorrente: boolean;
	limite_recorrencia: boolean;
	data_limite?: Date;
	paciente_id: number;
	user_uid: string;
}

@EntityRepository(PacienteAgenda)
export class PacienteAgendaRepository extends Repository<PacienteAgenda> {
	public async findByUserUid(uid: string): Promise<PacienteAgenda | undefined> {
		const user = await this.findOne({
			where: {
				user_uid: uid,
			},
		});
		return user;
	}

	public async findById(uid: string, id: number): Promise<PacienteAgenda | undefined> {
		const user = await this.findOne({
			where: {
				user_uid: uid,
				id,
			},
		});
		return user;
	}

	public async findByRecorrente(uid: string, recorrente: number): Promise<PacienteAgenda | undefined> {
		const user = await this.findOne({
			where: {
				user_uid: uid,
				recorrente,
			},
		});
		return user;
	}

	public async findByLimiteRecorrrencia(
		uid: string,
		limite_recorrencia: number,
	): Promise<PacienteAgenda | undefined> {
		const user = await this.findOne({
			where: {
				user_uid: uid,
				limite_recorrencia,
			},
		});
		return user;
	}
}
export default PacienteAgendaRepository;
