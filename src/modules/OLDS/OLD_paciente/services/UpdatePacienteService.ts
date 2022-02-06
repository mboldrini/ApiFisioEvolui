import { PacienteRepository } from '../typeorm/repositories/PacienteRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Paciente from '../typeorm/entities/Paciente';

interface IRequest {
	paciente_id: number;
	nome: string;
	telefoneCelular: string;
	telefoneContato?: string;
	email?: string;
	cpf: string;
	tem_comorbidade: number;
	comorbidade_descricao?: string;
	ultimoAtendimento?: Date;
	excluido: number;
	user_uid: string;
}

class UpdatePacienteService {
	public async execute({
		paciente_id,
		nome,
		telefoneCelular,
		telefoneContato,
		email,
		cpf,
		tem_comorbidade,
		comorbidade_descricao,
		ultimoAtendimento,
		excluido,
		user_uid,
	}: IRequest): Promise<Paciente> {
		const pacienteRepo = getCustomRepository(PacienteRepository);

		const pacienteExists = await pacienteRepo.findByUidAndId(user_uid, paciente_id);
		if (!pacienteExists) {
			throw new AppError('Não existe nenhum paciente cadastrado com esse ID');
		}

		pacienteExists.nome = nome;
		pacienteExists.telefoneCelular = telefoneCelular;

		if (telefoneContato) {
			pacienteExists.telefoneContato = telefoneContato;
		}
		if (email) {
			pacienteExists.email = email;
		}
		pacienteExists.cpf = cpf;
		pacienteExists.tem_comorbidade = tem_comorbidade;
		if (comorbidade_descricao) {
			pacienteExists.comorbidade_descricao = comorbidade_descricao;
		}
		if (ultimoAtendimento) {
			pacienteExists.ultimoAtendimento = ultimoAtendimento;
		}
		pacienteExists.excluido = excluido;

		await pacienteRepo.save(pacienteExists);

		return pacienteExists;
	}
}

export default UpdatePacienteService;
