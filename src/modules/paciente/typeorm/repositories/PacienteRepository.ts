import { EntityRepository, In, Repository } from 'typeorm';
import Paciente from '../entities/Paciente';

interface ITipoPesquisa {
	id: number;
	user_id: string;
}

interface IQtdAtendimento {
	qtd: number;
}

interface ITipoAtendimento {
	tipoAtendimento: number;
	user_id: string;
}

interface IFindPacientes {
	id: number;
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
			order: {
				nome: 'ASC',
			},
		});
		return pacientes;
	}

	public async findAllByIds(pacient: number[], user_id: string): Promise<Paciente[]> {
		const pacientes = await this.find({
			where: {
				id: In(pacient),
				user_id,
				excluido: false,
			},
		});
		return pacientes;
	}

	public async findAllByAtendimento({ tipoAtendimento, user_id }: ITipoAtendimento): Promise<any> {
		const qtdPcts = await this.findAndCount({
			where: {
				tipoAtendimento,
				user_id,
				excluido: false,
			},
		});
		return qtdPcts;
	}
}
export default PacienteRepository;
