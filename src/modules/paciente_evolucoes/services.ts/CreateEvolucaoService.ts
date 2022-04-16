import { PacientePagamentosRepository } from './../../paciente_pagamentos/typeorm/repositories/PacientePagamentosRepository';
import { EvolucaoRepository } from './../typeorm/repositories/EvolucoesRepository';
import { PacienteRepository } from './../../paciente/typeorm/repositories/PacienteRepository';
import { AgendamentoRepository } from './../../paciente_agendamento/typeorm/repositories/AgendamentoRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import TipoAtendimentoRepository from '@modules/paciente_tipoAtendimento/typeorm/repositories/TipoAtendimentoRepository';

interface IEvolucao {
	evolucao: string;
	observacoes: string;
	status: number;
	tipo?: number;
	agendamento_id: number;
	paciente_id: number;
	user_id: string;
	excluido?: boolean;
	pagamento?: boolean;
}

class CreateEvolucaoService {
	public async execute({
		evolucao,
		observacoes,
		status,
		tipo,
		agendamento_id,
		paciente_id,
		user_id,
		pagamento,
	}: IEvolucao): Promise<IEvolucao> {
		const evolucaoRepo = getCustomRepository(EvolucaoRepository);
		const pacienteRepo = getCustomRepository(PacienteRepository);
		const agendamentoRepo = getCustomRepository(AgendamentoRepository);
		const pagamentoRepo = getCustomRepository(PacientePagamentosRepository);
		const tipoAtendimentoRepo = getCustomRepository(TipoAtendimentoRepository);

		const pacienteExiste = await pacienteRepo.findOne({
			user_id,
		});

		if (!pacienteExiste) {
			throw new AppError('O Paciente informado não existe!', 404);
		}

		const agendamentoExiste = await agendamentoRepo.findByIdUser({
			id: agendamento_id,
			user_id,
		});
		if (!agendamentoExiste) {
			throw new AppError('O agendamento informado não existe!', 404);
		}

		/* Cria a evolução */
		const evolucaoCriado = await evolucaoRepo.create({
			evolucao,
			observacoes,
			status,
			tipo,
			agendamento_id,
			paciente_id,
			user_id,
			excluido: false,
		});

		agendamentoExiste.status = status;
		await agendamentoRepo.save(agendamentoExiste);

		await evolucaoRepo.save(evolucaoCriado);

		if (pagamento == true) {
			// Encontra o tipo de atendimento p/ pegar o valor p/ o pagamento
			const tipoDeAtendimento = await tipoAtendimentoRepo.findOne({
				excluido: false,
				user_id,
				id: pacienteExiste.tipoAtendimento,
			});
			const pagamentoCriado = await pagamentoRepo.create({
				id_evolucao: evolucaoCriado.id,
				id_paciente: evolucaoCriado.paciente_id,
				id_user: user_id,
				status: 0,
				valor: tipoDeAtendimento?.valor_atendimento,
				excluido: false,
			});
			await pagamentoRepo.save(pagamentoCriado);
		}

		return evolucaoCriado;
	}
}
export default CreateEvolucaoService;
