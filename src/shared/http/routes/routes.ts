import { Router } from 'express';
import usersRouter from '@modules/users/routes/users.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';
import userConfigsRouter from '@modules/params/routes/userconfigs.routes';

const routes = Router();

routes.get('/', (request, response) => {
	return response.json({ message: 'Hello Dev!' });
});

routes.use('/users', usersRouter);

routes.use('/sessions', sessionsRouter);

routes.use('/configs', userConfigsRouter);

export default routes;
