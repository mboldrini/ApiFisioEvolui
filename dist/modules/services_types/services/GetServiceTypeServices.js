"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _PaymentMethodRepository = require("./../../payment_method/payment_method/typeorm/repositories/PaymentMethodRepository");
var _ServicesTypesRepository = require("../typeorm/repositories/ServicesTypesRepository");
var _UsersRepository = require("../../users/users/typeorm/repositories/UsersRepository");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
var _DTO = require("../../../shared/DTO");
var _PaymentMethodUserRepository = _interopRequireDefault(require("./../../payment_method/paymentMethod_user/typeorm/repositories/PaymentMethodUserRepository"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class GetServicesTypeService {
  async execute({
    id,
    user_code
  }) {
    const usersRepo = (0, _typeorm.getCustomRepository)(_UsersRepository.UsersRepository);
    const servicesTypesRepo = (0, _typeorm.getCustomRepository)(_ServicesTypesRepository.ServicesTypesRepository);
    const paymentMethodRepo = (0, _typeorm.getCustomRepository)(_PaymentMethodRepository.PaymentMethodRepository);
    const paymentMethodUserRepo = (0, _typeorm.getCustomRepository)(_PaymentMethodUserRepository.default);
    const userExist = await usersRepo.findOne({
      user_code
    });
    if (!userExist) throw new _AppError.default("User don't exist", 404);
    const serviceExist = await servicesTypesRepo.findOne({
      id,
      user_id: userExist.user_id
    });
    if (!serviceExist) throw new _AppError.default("This service don't exist", 404);
    const paymentMethodUserExist = await paymentMethodUserRepo.findOne({
      id: serviceExist.paymentMethod_id,
      user_id: userExist.user_id
    });
    if (!paymentMethodUserExist) throw new _AppError.default('Tipo de pagamento não encontrado', 404);
    const paymentMethodExist = await paymentMethodRepo.findOne({
      id: paymentMethodUserExist.paymentMethod_id
    });
    if (!paymentMethodUserExist) throw new _AppError.default('Tipo de pagamento não encontrado - 2', 404);
    let service = {
      id: serviceExist.id,
      name: serviceExist.name,
      description: serviceExist.description,
      duration: serviceExist.duration,
      price: serviceExist.price,
      paymentMethod_id: paymentMethodUserExist.id,
      paymentMethod_name: paymentMethodExist?.name,
      created_at: serviceExist.created_at.toLocaleString(_DTO.TIMEZONE_LANGUAGE),
      updated_at: serviceExist.updated_at.toLocaleString(_DTO.TIMEZONE_LANGUAGE)
    };
    return service;
  }
}
var _default = GetServicesTypeService;
exports.default = _default;