"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _UsersRepository = require("../../../users/users/typeorm/repositories/UsersRepository");
var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
var _PaymentMethodUserRepository = _interopRequireDefault(require("../typeorm/repositories/PaymentMethodUserRepository"));
var _PaymentMethodRepository = _interopRequireDefault(require("../../payment_method/typeorm/repositories/PaymentMethodRepository"));
var _DTO = require("../../../../shared/DTO");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class UpdatePaymentMethodUserService {
  async execute({
    name,
    description,
    user_code,
    id
  }) {
    const paymentMethRepo = (0, _typeorm.getCustomRepository)(_PaymentMethodRepository.default);
    const userRepo = (0, _typeorm.getCustomRepository)(_UsersRepository.UsersRepository);
    const paymentMethodUserRepo = (0, _typeorm.getCustomRepository)(_PaymentMethodUserRepository.default);
    const userExist = await userRepo.findOne({
      user_code
    });
    if (!userExist) throw new _AppError.default("This user don't exist", 404);
    let paymentMethodSystem;

    /// Find the payment method - system
    const paymentMethodExist = await paymentMethRepo.findOne({
      name: name.toUpperCase()
    });
    if (!paymentMethodExist) {
      const paymentMethod = paymentMethRepo.create({
        name
      });
      await paymentMethRepo.save(paymentMethod);
      paymentMethodSystem = paymentMethod;
    } else {
      paymentMethodSystem = paymentMethodExist;
    }

    /// Find and update the payment method - USER
    const paymentUserExists = await paymentMethodUserRepo.findOne({
      id
    });
    if (!paymentUserExists) throw new _AppError.default("This payment method don't exist");
    paymentUserExists.description = description;
    paymentUserExists.paymentMethod_id = paymentMethodSystem.id;
    await paymentMethodUserRepo.save(paymentUserExists);
    let paymentUpdated = {
      id: paymentUserExists === null || paymentUserExists === void 0 ? void 0 : paymentUserExists.id,
      description: paymentUserExists.description,
      user_id: paymentUserExists.user_id,
      paymentMethod_id: paymentUserExists.paymentMethod_id,
      created_at: paymentUserExists.created_at.toLocaleString(_DTO.TIMEZONE_LANGUAGE),
      updated_at: paymentUserExists.updated_at.toLocaleString(_DTO.TIMEZONE_LANGUAGE)
    };
    return paymentUpdated;
  }
}
var _default = UpdatePaymentMethodUserService;
exports.default = _default;