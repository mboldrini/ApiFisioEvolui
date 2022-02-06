import { EnderecoRepository } from '../../OLD_endereco/typeorm/repositories/EnderecoRepository';
import { PacienteRepository } from '../typeorm/repositories/PacienteRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Paciente from '../typeorm/entities/Paciente';

interface IRequest {
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

class CreatePacienteService {
	public async execute({
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

		const pacienteCpfExists = await pacienteRepo.findByCpfAndUid(user_uid, cpf);
		if (pacienteCpfExists) {
			throw new AppError('Você já tem um paciente cadastrado com esse CPF');
		}

		const paciente = await pacienteRepo.create({
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
		});

		await pacienteRepo.save(paciente);

		return paciente;
	}
}

export default CreatePacienteService;
