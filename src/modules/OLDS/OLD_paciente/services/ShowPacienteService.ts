import { EnderecoRepository } from '../../OLD_endereco/typeorm/repositories/EnderecoRepository';
import { PacienteRepository } from '../typeorm/repositories/PacienteRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Paciente from '../typeorm/entities/Paciente';

interface IRequest {
	paciente_id: number;
	user_uid: string;
}

class ShowPacienteService {
	public async execute({ user_uid, paciente_id }: IRequest): Promise<Paciente> {
		const pacienteRepo = getCustomRepository(PacienteRepository);

		const pacienteExists = await pacienteRepo.findByUidAndId(user_uid, paciente_id);
		if (!pacienteExists) {
			throw new AppError('Não existe nenhum paciente cadastrado com esse ID');
		}

		const enderecoRepo = getCustomRepository(EnderecoRepository);
		const enderecoExists = await enderecoRepo.findByUidAndIdPaciente(user_uid, paciente_id);

		return pacienteExists;
	}
}

export default ShowPacienteService;
