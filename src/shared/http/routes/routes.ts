import { Router } from 'express';
import usersRouter from '@modules/users/users/routes/users.routes';
import sessionsRouter from '@modules/users/users/routes/sessions.routes';
import usersAddressRouter from '@modules/users/users_address/routes/usersaddress.routes';
import usersInfosRouter from '@modules/users/users_infos/routes/usersInfos.routes';
import clientsRouter from '@modules/clients/clients/routes/clients.routes';
import clientAddressRouter from '@modules/clients/clients_address/routes/clientaddress.routes';
import paymentMethodRouter from '@modules/payment_method/payment_method/routes/paymentmethod.routes';
import paymentMethodUserRouter from '@modules/payment_method/paymentMethod_user/routes/paymentMethodUser.routes';
import servicesTypesRouter from '@modules/services_types/routes/servicesTypes.routes';
import appointmentsRouter from '@modules/appointments/routes/appointments.routes';
import usersConfigsRouter from '@modules/users/users_configs/routes/usersConfigs.routes';
import userWorkDaysRouter from '@modules/users/user_workDays/routes/userWorkDays.routes';
import servicePaymentRouter from '@modules/service_payment/routes/servicepayment.routes';
import diagnosticRouter from '@modules/clients/diagnostic/routes/diagnostic.routes';
import complaintRouter from '@modules/clients/complaint/routes/complaint.routes';
import clientHdaRouter from '@modules/clients/hda/routes/clientHda.routes';
import clientHppRouter from '@modules/clients/hpp/routes/clientHpp.routes';
import functionalDiagnosisRouter from '@modules/clients/funcionalDiagnosis/routes/functionalDiagnosis.routes';
import clientPEvalRouter from '@modules/clients/physical_evaluation/routes/clientPhysicalEval.routes';
import clientResEvalRouter from '@modules/clients/respiratory_evaluation/routes/clientRespiratoryEval.routes';
import clientObjectiveRouter from '@modules/clients/objectives_goals/routes/clientObjectives.routes';
import guidelineRouter from '@modules/clients/guideline/routes/guidelines.routes';

const routes = Router();

routes.get('/', (request, response) => {
	return response.json({ message: 'Muf_asa!' });
});

routes.use('/sessions', sessionsRouter);

routes.use('/users', usersRouter);

routes.use('/users/address', usersAddressRouter);

routes.use('/users/infos', usersInfosRouter);

routes.use('/users/configs', usersConfigsRouter);

routes.use('/users/workdays/', userWorkDaysRouter);

routes.use('/clients', clientsRouter);

routes.use('/clients/address', clientAddressRouter);

routes.use('/clients/diagnostic', diagnosticRouter);

routes.use('/clients/complaint', complaintRouter);
routes.use('/clients/hda', clientHdaRouter);
routes.use('/clients/hpp', clientHppRouter);
routes.use('/clients/fcdiagnosis', functionalDiagnosisRouter);
routes.use('/clients/pevaluation', clientPEvalRouter);
routes.use('/clients/respevaluation', clientResEvalRouter);
routes.use('/clients/objectives', clientObjectiveRouter);
routes.use('/clients/guideline', guidelineRouter);

routes.use('/paymentMethodname/', paymentMethodRouter);

routes.use('/paymentMethod/', paymentMethodUserRouter);

routes.use('/servicesTypes', servicesTypesRouter);

routes.use('/servicepayment', servicePaymentRouter);

routes.use('/appointments', appointmentsRouter);

export default routes;
