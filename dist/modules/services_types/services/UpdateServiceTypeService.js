"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ServicesTypesRepository = require("../typeorm/repositories/ServicesTypesRepository");
var _UsersRepository = require("../../users/users/typeorm/repositories/UsersRepository");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class UpdateServicesTypeService {
  async execute({
    id,
    name,
    description,
    duration,
    price,
    paymentMethod_id,
    user_code
  }) {
    const usersRepo = (0, _typeorm.getCustomRepository)(_UsersRepository.UsersRepository);
    const servicesTypesRepo = (0, _typeorm.getCustomRepository)(_ServicesTypesRepository.ServicesTypesRepository);
    const userExist = await usersRepo.findOne({
      user_code
    });
    if (!userExist) throw new _AppError.default("User don't exist", 404);
    const serviceExist = await servicesTypesRepo.findOne({
      id,
      user_id: userExist.user_id
    });
    if (!serviceExist) throw new _AppError.default("This service don't exist", 404);
    serviceExist.name = name;
    serviceExist.description = description;
    serviceExist.duration = duration;
    serviceExist.price = price;
    serviceExist.paymentMethod_id = paymentMethod_id;
    await servicesTypesRepo.save(serviceExist);
    return serviceExist;
  }
}
var _default = UpdateServicesTypeService;
exports.default = _default;