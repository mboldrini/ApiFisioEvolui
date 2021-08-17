import { Router } from 'express';
import usersRouter from '@modules/users/routes/users.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';
import usersParamsRouter from '@modules/params/routes/userParams.routes';

const routes = Router();

routes.get('/', (request, response) => {
	return response.json({ message: 'Hello Dev!' });
});

routes.use('/users', usersRouter);

routes.use('/sessions', sessionsRouter);

routes.use('/userparams', usersParamsRouter);

export default routes;
