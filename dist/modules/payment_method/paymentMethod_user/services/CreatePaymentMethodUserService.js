"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _UsersRepository = require("./../../../users/users/typeorm/repositories/UsersRepository");
var _PaymentMethodUserRepository = require("./../typeorm/repositories/PaymentMethodUserRepository");
var _PaymentMethodRepository = require("./../../payment_method/typeorm/repositories/PaymentMethodRepository");
var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class CreatePaymentMethodUserService {
  async execute({
    name,
    description,
    user_code
  }) {
    const paymentMethRepo = (0, _typeorm.getCustomRepository)(_PaymentMethodRepository.PaymentMethodRepository);
    const paymentMethodUserRepo = (0, _typeorm.getCustomRepository)(_PaymentMethodUserRepository.PaymentMethodUserRepository);
    const userRepo = (0, _typeorm.getCustomRepository)(_UsersRepository.UsersRepository);
    let payment;
    let paymentMethodSystem;
    const userExist = await userRepo.findOne({
      user_code
    });
    if (!userExist) throw new _AppError.default("This user don't exist", 404);

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

    //Find the payment method USER
    const paymentMethodUserExists = await paymentMethodUserRepo.findOne({
      user_id: userExist.user_id,
      paymentMethod_id: paymentMethodExist === null || paymentMethodExist === void 0 ? void 0 : paymentMethodExist.id
    });
    if (paymentMethodUserExists) {
      var _paymentMethodSystem;
      payment = {
        id: paymentMethodUserExists === null || paymentMethodUserExists === void 0 ? void 0 : paymentMethodUserExists.id,
        name: (_paymentMethodSystem = paymentMethodSystem) === null || _paymentMethodSystem === void 0 ? void 0 : _paymentMethodSystem.name,
        description: paymentMethodUserExists === null || paymentMethodUserExists === void 0 ? void 0 : paymentMethodUserExists.description
      };
    } else {
      var _paymentMethodSystem2, _paymentMethodSystem3;
      const paymentMetUsr = paymentMethodUserRepo.create({
        description: description,
        user_id: userExist.user_id,
        paymentMethod_id: (_paymentMethodSystem2 = paymentMethodSystem) === null || _paymentMethodSystem2 === void 0 ? void 0 : _paymentMethodSystem2.id
      });
      await paymentMethodUserRepo.save(paymentMetUsr);
      payment = {
        id: paymentMetUsr.id,
        name: (_paymentMethodSystem3 = paymentMethodSystem) === null || _paymentMethodSystem3 === void 0 ? void 0 : _paymentMethodSystem3.name,
        description: paymentMetUsr.description
      };
    }
    return payment;
  }
}
var _default = CreatePaymentMethodUserService;
exports.default = _default;