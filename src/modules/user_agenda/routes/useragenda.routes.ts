import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import UserAgendaController from '../controllers/UserAgendaController';

const userAgendaRouter = Router();
const userAgendaController = new UserAgendaController();

userAgendaRouter.get('/', isAuthenticated, userAgendaController.show);

userAgendaRouter.post('/', isAuthenticated, userAgendaController.create);

export default userAgendaRouter;
