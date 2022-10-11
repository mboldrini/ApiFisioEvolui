"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _DTO = require("../../../shared/DTO");
var _ServicesTypesRepository = require("../typeorm/repositories/ServicesTypesRepository");
var _UsersRepository = require("../../users/users/typeorm/repositories/UsersRepository");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class GetAllServicesTypeService {
  async execute({
    user_code
  }) {
    const usersRepo = (0, _typeorm.getCustomRepository)(_UsersRepository.UsersRepository);
    const servicesTypesRepo = (0, _typeorm.getCustomRepository)(_ServicesTypesRepository.ServicesTypesRepository);
    const userExist = await usersRepo.findOne({
      user_code
    });
    if (!userExist) throw new _AppError.default("User don't exist", 404);
    const serviceExist = await servicesTypesRepo.find({
      user_id: userExist.user_id
    });
    const servicesList = serviceExist.map(service => ({
      id: service.id,
      name: service.name,
      description: service.description,
      duration: service.duration,
      price: service.price,
      created_at: service.created_at.toLocaleString(_DTO.TIMEZONE_LANGUAGE),
      updated_at: service.created_at.toLocaleString(_DTO.TIMEZONE_LANGUAGE)
    }));
    return servicesList;
  }
}
var _default = GetAllServicesTypeService;
exports.default = _default;