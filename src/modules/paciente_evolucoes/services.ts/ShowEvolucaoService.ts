import { TipoAtendimentoRepository } from './../../paciente_tipoAtendimento/typeorm/repositories/TipoAtendimentoRepository';
import { id } from 'date-fns/locale';
import { EvolucaoRepository } from './../typeorm/repositories/EvolucoesRepository';
import { PacienteRepository } from './../../paciente/typeorm/repositories/PacienteRepository';
import { AgendamentoRepository } from './../../paciente_agendamento/typeorm/repositories/AgendamentoRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

interface Irequest {
	id: number;
	user_id: string;
}

interface IEvolucao {
	id: number;
	evolucao: string;
	observacoes: string;
	status: number;
	tipo?: number;
	agendamento_id: number;
	paciente_nome?: string;
	tipo_atendimento?: string;
}

class ShowEvolucaoService {
	public async execute({ id, user_id }: Irequest): Promise<IEvolucao> {
		const evolucaoRepo = getCustomRepository(EvolucaoRepository);
		const pacienteRepo = getCustomRepository(PacienteRepository);
		const tipoAtendimentoRepo = getCustomRepository(TipoAtendimentoRepository);

		const evolucaoExiste = await evolucaoRepo.findOneById({
			id,
			user_id,
		});
		if (!evolucaoExiste) {
			throw new AppError('A evolução procurada não existe', 404);
		}

		const pacienteExiste = await pacienteRepo.findOne({
			id: evolucaoExiste.paciente_id,
			user_id,
			excluido: false,
		});

		const atendimentoExiste = await tipoAtendimentoRepo.findOne({
			id: pacienteExiste?.tipoAtendimento,
			user_id,
			excluido: false,
		});

		let infosEvolucao = {
			id: evolucaoExiste.id,
			evolucao: evolucaoExiste.evolucao,
			observacoes: evolucaoExiste.observacoes,
			status: evolucaoExiste.status,
			tipo: evolucaoExiste.tipo,
			agendamento_id: evolucaoExiste.agendamento_id,
			paciente_id: pacienteExiste?.id,
			paciente_nome: pacienteExiste?.nome,
			nome_tipoAtendimento: atendimentoExiste?.tipo,
		};

		return infosEvolucao;
	}
}
export default ShowEvolucaoService;
