import { EntityRepository, Repository } from 'typeorm';
import Paciente from '../entities/Paciente';

interface ITipoPesquisa {
	id: number;
	user_id: string;
}

@EntityRepository(Paciente)
export class PacienteRepository extends Repository<Paciente> {
	public async findByIdAndUser({ id, user_id }: ITipoPesquisa): Promise<Paciente | undefined> {
		const atendimento = await this.findOne({
			where: {
				id,
				user_id,
				excluido: false,
			},
		});
		return atendimento;
	}

	public async findAllPacientes(user_id: string): Promise<Paciente[] | undefined> {
		const pacientes = await this.find({
			where: {
				user_id,
				excluido: false,
			},
		});
		return pacientes;
	}
}
export default PacienteRepository;
