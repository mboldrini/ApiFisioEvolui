"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _PaymentMethodRepository = _interopRequireDefault(require("../../payment_method/typeorm/repositories/PaymentMethodRepository"));
var _UsersRepository = _interopRequireDefault(require("../../../users/users/typeorm/repositories/UsersRepository"));
var _DTO = require("../../../../shared/DTO");
var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
var _PaymentMethodUserRepository = _interopRequireDefault(require("../typeorm/repositories/PaymentMethodUserRepository"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class GetAllPaymentMethodUserService {
  async execute({
    user_code
  }) {
    const userRepo = (0, _typeorm.getCustomRepository)(_UsersRepository.default);
    const paymentMethodRepo = (0, _typeorm.getCustomRepository)(_PaymentMethodRepository.default);
    const paymentMethodUserRepo = (0, _typeorm.getCustomRepository)(_PaymentMethodUserRepository.default);
    const userExist = await userRepo.findOne({
      user_code
    });
    if (!userExist) throw new _AppError.default("This user don't exist", 404);
    const paymentUserExists = await paymentMethodUserRepo.find({
      user_id: userExist.user_id
    });
    if (!paymentUserExists) throw new _AppError.default("This payment method don't exist");
    const paymentMethod = await paymentMethodRepo.find();
    const payments = paymentUserExists.map(payment => ({
      id: payment.id,
      description: payment.description,
      paymentMethod_id: payment.paymentMethod_id,
      paymentMethod_name: paymentMethod.filter(pmetod => {
        if (pmetod.id === payment.paymentMethod_id) return pmetod.id;
      }).map(pmtd => {
        return pmtd.name;
      })[0],
      created_at: payment.created_at.toLocaleString(_DTO.TIMEZONE_LANGUAGE),
      updated_at: payment.updated_at.toLocaleString(_DTO.TIMEZONE_LANGUAGE)
    }));
    return payments;
  }
}
var _default = GetAllPaymentMethodUserService;
exports.default = _default;