"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _PaymentMethodRepository = require("./../../payment_method/typeorm/repositories/PaymentMethodRepository");
var _DTO = require("../../../../shared/DTO");
var _UsersRepository = _interopRequireDefault(require("../../../users/users/typeorm/repositories/UsersRepository"));
var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
var _PaymentMethodUserRepository = _interopRequireDefault(require("../typeorm/repositories/PaymentMethodUserRepository"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class GetPaymentMethodUserService {
  async execute({
    id,
    user_code
  }) {
    const userRepo = (0, _typeorm.getCustomRepository)(_UsersRepository.default);
    const paymentMethodRepo = (0, _typeorm.getCustomRepository)(_PaymentMethodRepository.PaymentMethodRepository);
    const paymentMethodUserRepo = (0, _typeorm.getCustomRepository)(_PaymentMethodUserRepository.default);
    const userExist = await userRepo.findOne({
      user_code
    });
    if (!userExist) throw new _AppError.default("This user don't exist", 404);
    const paymentUserExists = await paymentMethodUserRepo.findOne({
      id,
      user_id: userExist.user_id
    });
    if (!paymentUserExists) throw new _AppError.default("This payment method don't exist");
    const paymentMethod = await paymentMethodRepo.findOne({
      id: paymentUserExists.paymentMethod_id
    });
    if (!paymentMethod) throw new _AppError.default("This payment method don't exist", 404);
    const payment = {
      id: paymentUserExists.id,
      description: paymentUserExists.description,
      paymentMethod_id: paymentUserExists.paymentMethod_id,
      paymentMethod_name: paymentMethod.name,
      created_at: paymentUserExists.created_at.toLocaleString(_DTO.TIMEZONE_LANGUAGE),
      updated_at: paymentUserExists.updated_at.toLocaleString(_DTO.TIMEZONE_LANGUAGE)
    };
    return payment;
  }
}
var _default = GetPaymentMethodUserService;
exports.default = _default;