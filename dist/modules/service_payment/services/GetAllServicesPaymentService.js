"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ServicePaymentRepository = require("./../typeorm/repositories/ServicePaymentRepository");
var _UsersRepository = _interopRequireDefault(require("../../users/users/typeorm/repositories/UsersRepository"));
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class GetAllServicesPaymentService {
  async get({
    user_code
  }) {
    const userRepo = (0, _typeorm.getCustomRepository)(_UsersRepository.default);
    const paymentServiceRepo = (0, _typeorm.getCustomRepository)(_ServicePaymentRepository.ServicePaymentRepository);
    const userExist = await userRepo.findOne({
      user_code
    });
    if (!userExist) throw new _AppError.default("This user don't exist", 404);
    const servicePaymentExist = await paymentServiceRepo.find({
      user_id: userExist.user_id,
      scheduled: true
    });

    // const payment = {
    // 	appointment_id: servicePaymentExist.appointment_id,
    // 	price: servicePaymentExist.price,
    // 	comments: servicePaymentExist.comments,
    // 	status: servicePaymentExist.status,
    // 	scheduled: servicePaymentExist.scheduled,
    // 	paymentMethod_id: servicePaymentExist.paymentMethod_id,
    // 	created_at: servicePaymentExist.created_at.toLocaleString(TIMEZONE_LANGUAGE),
    // 	updated_at: servicePaymentExist.updated_at.toLocaleString(TIMEZONE_LANGUAGE),
    // };

    return servicePaymentExist;
  }
}
var _default = GetAllServicesPaymentService;
exports.default = _default;