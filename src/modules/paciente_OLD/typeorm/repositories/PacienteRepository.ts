import User from '@modules/users/typeorm/entities/User';
import { EntityRepository, Repository } from 'typeorm';
import Paciente from '../entities/Paciente';

interface ITeste {
	nome: string;
	telefoneCelular: string;
	telefoneContato: string;
	email: string;
	cpf: string;
	tem_comorbidade: number;
	comorbidade_descricao: string;
	ultimoAtendimento: Date;
	excluido: number;
	user_uid: string;
}

@EntityRepository(Paciente)
export class PacienteRepository extends Repository<Paciente> {
	public async findByUid(uid: string): Promise<Paciente | undefined> {
		const paciente = await this.findOne({
			where: {
				user_uid: uid,
			},
		});
		return paciente;
	}
	public async findByUidAndId(uid: string, id: number): Promise<Paciente | undefined> {
		const paciente = await this.findOne({
			where: {
				user_uid: uid,
				id: id,
			},
		});
		return paciente;
	}
	public async findByCpfAndUid(uid: string, cpf: string): Promise<Paciente | undefined> {
		const paciente = await this.findOne({
			where: {
				user_uid: uid,
				cpf: cpf,
			},
		});
		return paciente;
	}
}
export default PacienteRepository;
