import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { Router } from 'express';
import UserConfigsController from '../controllers/UserConfigsController';

const userConfigsRouter = Router();
const userConfigsController = new UserConfigsController();

userConfigsRouter.get('/', isAuthenticated, userConfigsController.show);

export default userConfigsRouter;
