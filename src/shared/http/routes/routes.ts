import { Router } from 'express';
import usersRouter from '@modules/users/routes/users.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';
import tipoAtendimentoRouter from '@modules/tipo_atendimento/routes/tipoAtendimento.routes';
import pacienteRouter from '@modules/paciente/routes/paciente.routes';
// import userConfigsRouter from '@modules/user_configs/routes/userconfigs.routes';
// import userAgendaRouter from '@modules/user_horarios/routes/useragenda.routes';
// import enderecoRouter from '@modules/endereco/routes/endereco.routes';
// import pacienteRouter from '@modules/paciente/routes/paciente.routes';
// import pacienteAgendaRouter from '@modules/paciente_agenda/routes/pacienteagenda.routes';

const routes = Router();

routes.get('/', (request, response) => {
	return response.json({ message: 'Muf_asa!' });
});

routes.use('/sessions', sessionsRouter);

routes.use('/users', usersRouter);

routes.use('/tipoAtendimento', tipoAtendimentoRouter);

routes.use('/paciente', pacienteRouter);

// routes.use('/configs', userConfigsRouter);

// routes.use('/horarios', userAgendaRouter);

// routes.use('/endereco', enderecoRouter);

// routes.use('/paciente', pacienteRouter);

// routes.use('/pacienteagenda', pacienteAgendaRouter);

export default routes;
