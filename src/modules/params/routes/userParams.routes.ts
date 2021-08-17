import { Router } from 'express';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import UserParamsController from '../controllers/UserParamsController';

const usersParamsRouter = Router();
const usersParamsController = new UserParamsController();

usersParamsRouter.post('/', isAuthenticated, usersParamsController.create);

export default usersParamsRouter;
