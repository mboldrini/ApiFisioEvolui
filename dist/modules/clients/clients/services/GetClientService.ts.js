"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ServicesTypesRepository = require("../../../services_types/typeorm/repositories/ServicesTypesRepository");
var _ClientsRepository = require("../typeorm/repositories/ClientsRepository");
var _UsersRepository = require("../../../users/users/typeorm/repositories/UsersRepository");
var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
var _DTO = require("../../../../shared/DTO");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class GetClientService {
  async execute({
    id,
    user_code
  }) {
    const usersRepo = (0, _typeorm.getCustomRepository)(_UsersRepository.UsersRepository);
    const clientRepo = (0, _typeorm.getCustomRepository)(_ClientsRepository.ClientsRepository);
    const serviceTypeRepo = (0, _typeorm.getCustomRepository)(_ServicesTypesRepository.ServicesTypesRepository);
    const userExists = await usersRepo.findOne({
      user_code
    });
    if (!userExists) throw new _AppError.default("User don't exist", 404);
    const clientExist = await clientRepo.findOne({
      id,
      user_id: userExists.user_id,
      enabled: true
    });
    if (!clientExist) throw new _AppError.default("This client don't exist ", 404);
    const serviceExists = await serviceTypeRepo.findOne({
      id: clientExist.serviceType_id,
      user_id: userExists.user_id
    });
    if (!serviceExists) throw new _AppError.default('O tipo de atendimento informado não existe.');
    let client = {
      id: clientExist.id,
      name: clientExist.name,
      dataNascimento: clientExist.dataNascimento,
      document: clientExist.document,
      email: clientExist.email,
      celphone: clientExist.celphone,
      second_celphone: clientExist.second_celphone,
      instagram: clientExist.instagram,
      address: clientExist.address,
      latitude: clientExist.latitude,
      longitude: clientExist.longitude,
      created_at: clientExist.created_at.toLocaleString(_DTO.TIMEZONE_LANGUAGE),
      updated_at: clientExist.updated_at.toLocaleString(_DTO.TIMEZONE_LANGUAGE),
      serviceType: {
        id: serviceExists.id,
        name: serviceExists.name,
        description: serviceExists.description
      }
    };
    return client;
  }
}
var _default = GetClientService;
exports.default = _default;