"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _PaymentMethodRepository = require("./../typeorm/repositories/PaymentMethodRepository");
var _typeorm = require("typeorm");
class CreatePaymentMethodService {
  async execute(name) {
    const paymentMethodRepo = (0, _typeorm.getCustomRepository)(_PaymentMethodRepository.PaymentMethodRepository);
    const paymentMethodEists = await paymentMethodRepo.findOne({
      name
    });
    if (paymentMethodEists) {
      return paymentMethodEists;
    }
    const paymentMethod = paymentMethodRepo.create({
      name: name.toUpperCase()
    });
    await paymentMethodRepo.save(paymentMethod);
    return paymentMethod;
  }
}
var _default = CreatePaymentMethodService;
exports.default = _default;