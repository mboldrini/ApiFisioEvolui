"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ServicesTypesRepository = require("./../../../services_types/typeorm/repositories/ServicesTypesRepository");
var _UsersRepository = _interopRequireDefault(require("../../../users/users/typeorm/repositories/UsersRepository"));
var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
var _PaymentMethodUserRepository = _interopRequireDefault(require("../typeorm/repositories/PaymentMethodUserRepository"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class DeletePaymentMethodUserService {
  async execute({
    id,
    user_code
  }) {
    const userRepo = (0, _typeorm.getCustomRepository)(_UsersRepository.default);
    const servicesRepo = (0, _typeorm.getCustomRepository)(_ServicesTypesRepository.ServicesTypesRepository);
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
    const serviceExist = await servicesRepo.findAndCount({
      user_id: userExist.user_id,
      paymentMethod_id: paymentUserExists.id
    });
    if (serviceExist[1] > 0) throw new _AppError.default('Não é possível excluir uma forma de pagamento em uso', 404);
    await paymentMethodUserRepo.delete(paymentUserExists);
    return {
      message: 'ok'
    };
  }
}
var _default = DeletePaymentMethodUserService;
exports.default = _default;