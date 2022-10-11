"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ServicePaymentRepository = require("./../../service_payment/typeorm/repositories/ServicePaymentRepository");
var _AppointmentsRepository = require("./../typeorm/repositories/AppointmentsRepository");
var _UsersRepository = require("../../users/users/typeorm/repositories/UsersRepository");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class DeleteAppointmentService {
  async execute({
    user_code,
    appointment_id
  }) {
    const userRepo = (0, _typeorm.getCustomRepository)(_UsersRepository.UsersRepository);
    const appointmentRepo = (0, _typeorm.getCustomRepository)(_AppointmentsRepository.AppointmentsRepository);
    const servicePaymentRepo = (0, _typeorm.getCustomRepository)(_ServicePaymentRepository.ServicePaymentRepository);
    const userExist = await userRepo.findOne({
      user_code
    });
    if (!userExist) throw new _AppError.default("This user don't exist");
    const appointment = await appointmentRepo.findOne({
      id: appointment_id,
      user_id: userExist.user_id,
      scheduled: true
    });
    if (!appointment) throw new _AppError.default("This appointment don't exist!", 404);
    const servicePaymentExist = await servicePaymentRepo.findOne({
      user_id: userExist.user_id,
      appointment_id: appointment.id
    });
    if (servicePaymentExist) {
      await servicePaymentRepo.delete(servicePaymentExist);
    }
    await appointmentRepo.delete(appointment);
    return {
      message: 'ok'
    };
  }
}
var _default = DeleteAppointmentService;
exports.default = _default;