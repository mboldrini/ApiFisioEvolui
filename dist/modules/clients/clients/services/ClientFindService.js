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
class ClientFindService {
  async execute({
    user_code,
    name,
    cpf,
    email,
    telefone,
    endereco,
    tipoServico
  }) {
    const usersRepo = (0, _typeorm.getCustomRepository)(_UsersRepository.UsersRepository);
    const clientRepo = (0, _typeorm.getCustomRepository)(_ClientsRepository.ClientsRepository);
    const serviceTypeRepo = (0, _typeorm.getCustomRepository)(_ServicesTypesRepository.ServicesTypesRepository);
    const userExists = await usersRepo.findOne({
      user_code
    });
    if (!userExists) throw new _AppError.default('Esse usuário não existe', 404);
    const serviceExists = await serviceTypeRepo.find({
      user_id: userExists.user_id
    });
    if (!serviceExists) throw new _AppError.default('Não foi encontrado nenhum tipo de serviço cadastrado');
    const serviceList = serviceExists.map(service => ({
      id: service.id,
      name: service.name,
      description: service.description
    }));
    let clientsList;
    if (name) {
      clientsList = await clientRepo.findByName({
        user_id: userExists.user_id,
        nome: name
      });
    }
    if (cpf) {
      clientsList = await clientRepo.findByCPF({
        user_id: userExists.user_id,
        cpf: cpf
      });
    }
    if (email) {
      clientsList = await clientRepo.findByEmail({
        user_id: userExists.user_id,
        email: email
      });
    }
    if (telefone) {
      clientsList = await clientRepo.findByTelefone({
        user_id: userExists.user_id,
        celphone: telefone
      });
    }
    if (endereco) {
      clientsList = await clientRepo.findByAddress({
        user_id: userExists.user_id,
        address: endereco
      });
    }
    if (tipoServico) {
      clientsList = await clientRepo.findByServiceType({
        user_id: userExists.user_id,
        serviceType_id: tipoServico
      });
    }
    const clients = clientsList?.map(client => ({
      id: client.id,
      name: client.name,
      dataNascimento: client.dataNascimento,
      document: client.document,
      email: client.email,
      celphone: client.celphone,
      second_celphone: client.second_celphone,
      instagram: client.instagram,
      address: client.address,
      latitude: client.latitude,
      longitude: client.longitude,
      serviceType: serviceList.filter(pmetod => {
        if (pmetod.id === client.serviceType_id) return pmetod.id;
      })[0],
      created_at: client.created_at.toLocaleString(_DTO.TIMEZONE_LANGUAGE),
      updated_at: client.updated_at.toLocaleString(_DTO.TIMEZONE_LANGUAGE)
    }));
    return clients;
  }
}
var _default = ClientFindService;
exports.default = _default;