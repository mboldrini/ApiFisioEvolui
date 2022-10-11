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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class UpdateClientService {
  async execute({
    id,
    user_code,
    name,
    dataNascimento,
    document,
    email,
    celphone,
    second_celphone,
    instagram,
    serviceType_id,
    latitude,
    longitude,
    address
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
      user_id: userExists.user_id
    });
    if (!clientExist) throw new _AppError.default("This client don't exist ", 404);
    const serviceExists = await serviceTypeRepo.findOne({
      id: serviceType_id,
      user_id: userExists.user_id
    });
    if (!serviceExists) throw new _AppError.default('O tipo de atendimento informado não existe.');
    clientExist.name = name;
    clientExist.dataNascimento = dataNascimento;
    clientExist.document = document;
    clientExist.email = email;
    clientExist.celphone = celphone;
    clientExist.second_celphone = second_celphone;
    clientExist.instagram = instagram;
    clientExist.serviceType_id = serviceExists.id;
    clientExist.address = address;
    clientExist.latitude = latitude;
    clientExist.longitude = longitude;
    await clientRepo.save(clientExist);
    return clientExist;
  }
}
var _default = UpdateClientService;
exports.default = _default;