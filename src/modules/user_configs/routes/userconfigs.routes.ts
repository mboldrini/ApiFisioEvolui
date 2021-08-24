import { Router } from 'express';
import UserConfigsController from '../controllers/UserConfigsController';

const userConfigsRouter = Router();
const userConfigsController = new UserConfigsController();

userConfigsRouter.post('/', userConfigsController.create);

export default userConfigsRouter;
