import { Router } from 'express';
import usersRouter from '@modules/users/routes/users.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';
import tipoAtendimentoRouter from '@modules/paciente_tipoAtendimento/routes/tipoAtendimento.routes';
import pacienteRouter from '@modules/paciente/routes/paciente.routes';
import agendamentoRouter from '@modules/paciente_agendamento/routes/agendamento.routes';
import evolucaoRouter from '@modules/paciente_evolucoes/routes/evolucao.routes';
import agendaRouter from '@modules/Agenda/routes/agenda.routes';
import pacientePagamentosRouter from '@modules/paciente_pagamentos/routes/pagamentos.routes';

const routes = Router();

routes.get('/', (request, response) => {
	return response.json({ message: 'Muf_asa!' });
});

routes.use('/sessions', sessionsRouter);

routes.use('/users', usersRouter);

routes.use('/tipoAtendimento', tipoAtendimentoRouter);

routes.use('/paciente', pacienteRouter);

routes.use('/agendamento', agendamentoRouter);

routes.use('/evolucao', evolucaoRouter);

routes.use('/agenda', agendaRouter);

routes.use('/pacientePagamentos', pacientePagamentosRouter);

export default routes;
