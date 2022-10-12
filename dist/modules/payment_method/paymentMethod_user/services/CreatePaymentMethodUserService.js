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
      paymentMethod_id: paymentMethodExist?.id
    });
    if (paymentMethodUserExists) {
      payment = {
        id: paymentMethodUserExists?.id,
        name: paymentMethodSystem?.name,
        description: paymentMethodUserExists?.description
      };
    } else {
      const paymentMetUsr = paymentMethodUserRepo.create({
        description: description,
        user_id: userExist.user_id,
        paymentMethod_id: paymentMethodSystem?.id
      });
      await paymentMethodUserRepo.save(paymentMetUsr);
      payment = {
        id: paymentMetUsr.id,
        name: paymentMethodSystem?.name,
        description: paymentMetUsr.description
      };
    }
    return payment;
  }
}
var _default = CreatePaymentMethodUserService;
exports.default = _default;