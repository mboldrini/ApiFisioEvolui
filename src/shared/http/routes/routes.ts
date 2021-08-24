import { Router } from 'express';
import usersRouter from '@modules/users/routes/users.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';
import userConfigsRouter from '@modules/user_configs/routes/userconfigs.routes';
import userAgendaRouter from '@modules/user_agenda/routes/useragenda.routes';

const routes = Router();

routes.get('/', (request, response) => {
	return response.json({ message: 'Hello Dev!' });
});

routes.use('/sessions', sessionsRouter);

routes.use('/users', usersRouter);

routes.use('/configs', userConfigsRouter);

routes.use('/agenda', userAgendaRouter);

export default routes;
