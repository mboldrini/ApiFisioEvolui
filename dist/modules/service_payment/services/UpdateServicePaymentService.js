"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ServicesTypesRepository = require("./../../services_types/typeorm/repositories/ServicesTypesRepository");
var _ServicePaymentRepository = require("./../typeorm/repositories/ServicePaymentRepository");
var _AppointmentsRepository = require("./../../appointments/typeorm/repositories/AppointmentsRepository");
var _UsersRepository = _interopRequireDefault(require("../../users/users/typeorm/repositories/UsersRepository"));
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class UpdateServicePaymentService {
  async update({
    id,
    user_code,
    appointment_id,
    comments,
    status,
    scheduled,
    serviceType_id
  }) {
    const userRepo = (0, _typeorm.getCustomRepository)(_UsersRepository.default);
    const appointmentRepo = (0, _typeorm.getCustomRepository)(_AppointmentsRepository.AppointmentsRepository);
    const serviceTypeRepo = (0, _typeorm.getCustomRepository)(_ServicesTypesRepository.ServicesTypesRepository);
    const paymentServiceRepo = (0, _typeorm.getCustomRepository)(_ServicePaymentRepository.ServicePaymentRepository);
    const userExist = await userRepo.findOne({
      user_code
    });
    if (!userExist) throw new _AppError.default("This user don't exist", 404);
    const appointmentExist = await appointmentRepo.findOne({
      id: appointment_id,
      user_id: userExist.user_id
    });
    if (!appointmentExist) throw new _AppError.default("This appointment don't exist", 404);
    const serviceTypeExist = await serviceTypeRepo.findOne({
      user_id: userExist.user_id,
      id: serviceType_id
    });
    if (!serviceTypeExist) throw new _AppError.default("This service type don't exist", 404);
    const servicePaymentExist = await paymentServiceRepo.findOne({
      user_id: userExist.user_id,
      id: id,
      scheduled: true
    });
    if (!servicePaymentExist) throw new _AppError.default("Don't exist an payment for this appointment");
    servicePaymentExist.appointment_id = appointment_id;
    servicePaymentExist.price = appointmentExist.price;
    servicePaymentExist.comments = comments;
    servicePaymentExist.status = status;
    servicePaymentExist.scheduled = scheduled;
    servicePaymentExist.serviceType_id = serviceType_id;
    await paymentServiceRepo.save(servicePaymentExist);
    return servicePaymentExist;
  }
}
var _default = UpdateServicePaymentService;
exports.default = _default;