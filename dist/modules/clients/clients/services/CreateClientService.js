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
class CreateClientService {
  async execute({
    user_code,
    name,
    dataNascimento,
    document,
    email,
    celphone,
    second_celphone,
    instagram,
    address,
    latitude,
    longitude,
    serviceType_id
  }) {
    const usersRepo = (0, _typeorm.getCustomRepository)(_UsersRepository.UsersRepository);
    const clientRepo = (0, _typeorm.getCustomRepository)(_ClientsRepository.ClientsRepository);
    const serviceTypeRepo = (0, _typeorm.getCustomRepository)(_ServicesTypesRepository.ServicesTypesRepository);
    const userExists = await usersRepo.findOne({
      user_code
    });
    if (!userExists) throw new _AppError.default("User don't exist", 404);
    const clientExists = await clientRepo.findOne({
      email: email,
      user_id: userExists.user_id
    });
    //	if (clientExists) throw new AppError('Já existe um paciente cadastrado com esse email.', 404);

    const serviceExists = await serviceTypeRepo.findOne({
      id: serviceType_id,
      user_id: userExists.user_id
    });
    if (!serviceExists) throw new _AppError.default('O tipo de atendimento informado não existe.');
    const clientInfos = clientRepo.create({
      name: name,
      dataNascimento,
      document,
      email,
      celphone,
      second_celphone,
      instagram,
      address,
      latitude,
      longitude,
      user_id: userExists.user_id,
      enabled: true,
      serviceType_id: serviceExists.id
    });
    await clientRepo.save(clientInfos);
    return clientInfos;
  }
}
var _default = CreateClientService;
exports.default = _default;