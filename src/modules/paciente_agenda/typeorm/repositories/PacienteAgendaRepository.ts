import { EntityRepository, Repository } from 'typeorm';
import PacienteAgenda from '../entities/PacienteAgenda';

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

	public async findByDiaSemana(uid: string, dia_semana: number): Promise<PacienteAgenda | undefined> {
		const user = await this.findOne({
			where: {
				user_uid: uid,
				dia_semana,
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
