"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _DTO = require("./../../../shared/DTO");
var _ServicePaymentRepository = require("./../typeorm/repositories/ServicePaymentRepository");
var _UsersRepository = _interopRequireDefault(require("../../users/users/typeorm/repositories/UsersRepository"));
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class GetServicePaymentService {
  async get({
    user_code,
    id
  }) {
    const userRepo = (0, _typeorm.getCustomRepository)(_UsersRepository.default);
    const paymentServiceRepo = (0, _typeorm.getCustomRepository)(_ServicePaymentRepository.ServicePaymentRepository);
    const userExist = await userRepo.findOne({
      user_code
    });
    if (!userExist) throw new _AppError.default("This user don't exist", 404);
    const servicePaymentExist = await paymentServiceRepo.findOne({
      user_id: userExist.user_id,
      id,
      scheduled: true
    });
    if (!servicePaymentExist) throw new _AppError.default("Don't exist an payment for this appointment");
    const payment = {
      appointment_id: servicePaymentExist.appointment_id,
      price: servicePaymentExist.price,
      comments: servicePaymentExist.comments,
      status: servicePaymentExist.status,
      scheduled: servicePaymentExist.scheduled,
      paymentMethod_id: servicePaymentExist.paymentMethod_id,
      created_at: servicePaymentExist.created_at.toLocaleString(_DTO.TIMEZONE_LANGUAGE),
      updated_at: servicePaymentExist.updated_at.toLocaleString(_DTO.TIMEZONE_LANGUAGE)
    };
    return payment;
  }
}
var _default = GetServicePaymentService;
exports.default = _default;