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
class GetAllClientsService {
  async execute({
    user_code
  }) {
    const usersRepo = (0, _typeorm.getCustomRepository)(_UsersRepository.UsersRepository);
    const clientRepo = (0, _typeorm.getCustomRepository)(_ClientsRepository.ClientsRepository);
    const servicesRepo = (0, _typeorm.getCustomRepository)(_ServicesTypesRepository.ServicesTypesRepository);
    const userExists = await usersRepo.findOne({
      user_code
    });
    if (!userExists) throw new _AppError.default("User don't exist", 404);
    const servicesList = await servicesRepo.find({
      user_id: userExists.user_id
    });
    const clientsList = await clientRepo.find({
      user_id: userExists.user_id,
      enabled: true
    });
    let clientList = clientsList.map(client => ({
      id: client.id,
      name: client.name,
      dataNascimento: client.dataNascimento,
      document: client.document,
      email: client.email,
      celphone: client.celphone,
      address: client.address,
      serviceType_id: client.serviceType_id,
      serviceType_name: servicesList.filter(servicesList => {
        if (servicesList.id == client.serviceType_id) return servicesList.name;
      }).map(servicesList => {
        return servicesList.name;
      })[0]
    }));
    return clientList;
  }
}
var _default = GetAllClientsService;
exports.default = _default;