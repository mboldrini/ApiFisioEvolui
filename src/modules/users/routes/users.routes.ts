import { Router } from 'express';
import UsersController from '../controllers/UserController';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/:uid', usersController.show);
usersRouter.post('/', usersController.create);
usersRouter.put('/:uid', usersController.update);

export default usersRouter;
