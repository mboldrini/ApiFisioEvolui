"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _users = _interopRequireDefault(require("../../../modules/users/users/routes/users.routes"));
var _sessions = _interopRequireDefault(require("../../../modules/users/users/routes/sessions.routes"));
var _usersaddress = _interopRequireDefault(require("../../../modules/users/users_address/routes/usersaddress.routes"));
var _usersInfos = _interopRequireDefault(require("../../../modules/users/users_infos/routes/usersInfos.routes"));
var _clients = _interopRequireDefault(require("../../../modules/clients/clients/routes/clients.routes"));
var _paymentmethod = _interopRequireDefault(require("../../../modules/payment_method/payment_method/routes/paymentmethod.routes"));
var _paymentMethodUser = _interopRequireDefault(require("../../../modules/payment_method/paymentMethod_user/routes/paymentMethodUser.routes"));
var _servicesTypes = _interopRequireDefault(require("../../../modules/services_types/routes/servicesTypes.routes"));
var _appointments = _interopRequireDefault(require("../../../modules/appointments/routes/appointments.routes"));
var _usersConfigs = _interopRequireDefault(require("../../../modules/users/users_configs/routes/usersConfigs.routes"));
var _userWorkDays = _interopRequireDefault(require("../../../modules/users/user_workDays/routes/userWorkDays.routes"));
var _servicepayment = _interopRequireDefault(require("../../../modules/service_payment/routes/servicepayment.routes"));
var _diagnostic = _interopRequireDefault(require("../../../modules/clients/diagnostic/routes/diagnostic.routes"));
var _complaint = _interopRequireDefault(require("../../../modules/clients/complaint/routes/complaint.routes"));
var _clientHda = _interopRequireDefault(require("../../../modules/clients/hda/routes/clientHda.routes"));
var _clientHpp = _interopRequireDefault(require("../../../modules/clients/hpp/routes/clientHpp.routes"));
var _functionalDiagnosis = _interopRequireDefault(require("../../../modules/clients/funcionalDiagnosis/routes/functionalDiagnosis.routes"));
var _clientPhysicalEval = _interopRequireDefault(require("../../../modules/clients/physical_evaluation/routes/clientPhysicalEval.routes"));
var _clientRespiratoryEval = _interopRequireDefault(require("../../../modules/clients/respiratory_evaluation/routes/clientRespiratoryEval.routes"));
var _clientObjectives = _interopRequireDefault(require("../../../modules/clients/objectives_goals/routes/clientObjectives.routes"));
var _guidelines = _interopRequireDefault(require("../../../modules/clients/guideline/routes/guidelines.routes"));
var _evolutions = _interopRequireDefault(require("../../../modules/clients/evolutions/routes/evolutions.routes"));
var _versionamento = _interopRequireDefault(require("../../../modules/versionamento/routes/versionamento.routes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const routes = (0, _express.Router)();
routes.get('/', (request, response) => {
  return response.json({
    message: 'Muf_asa!'
  });
});
routes.use('/sessions', _sessions.default);
routes.use('/users', _users.default);
routes.use('/users/address', _usersaddress.default);
routes.use('/users/infos', _usersInfos.default);
routes.use('/users/configs', _usersConfigs.default);
routes.use('/users/workdays/', _userWorkDays.default);
routes.use('/clients', _clients.default);
routes.use('/clients/diagnostic', _diagnostic.default);
routes.use('/clients/complaint', _complaint.default);
routes.use('/clients/hda', _clientHda.default);
routes.use('/clients/hpp', _clientHpp.default);
routes.use('/clients/fcdiagnosis', _functionalDiagnosis.default);
routes.use('/clients/pevaluation', _clientPhysicalEval.default);
routes.use('/clients/respevaluation', _clientRespiratoryEval.default);
routes.use('/clients/objectives', _clientObjectives.default);
routes.use('/clients/evolutions', _evolutions.default);
routes.use('/clients/guideline', _guidelines.default);
routes.use('/paymentMethodname/', _paymentmethod.default);
routes.use('/paymentMethod/', _paymentMethodUser.default);
routes.use('/servicesTypes', _servicesTypes.default);
routes.use('/servicepayment', _servicepayment.default);
routes.use('/appointments', _appointments.default);
routes.use('/versao', _versionamento.default);
var _default = routes;
exports.default = _default;