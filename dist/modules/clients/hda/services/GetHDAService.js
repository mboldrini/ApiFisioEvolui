"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ClientHDA = require("./../typeorm/repositories/ClientHDA");
var _UsersRepository = require("./../../../users/users/typeorm/repositories/UsersRepository");
var _ClientsRepository = require("./../../clients/typeorm/repositories/ClientsRepository");
var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class GetHDAService {
  async execute({
    id,
    client_id,
    user_code
  }) {
    const usersRepo = (0, _typeorm.getCustomRepository)(_UsersRepository.UsersRepository);
    const clientsRepo = (0, _typeorm.getCustomRepository)(_ClientsRepository.ClientsRepository);
    const hdaRepo = (0, _typeorm.getCustomRepository)(_ClientHDA.ClientHDARepository);
    const userExists = await usersRepo.findOne({
      user_code
    });
    if (!userExists) throw new _AppError.default('Esse usuário não existe', 404);
    const clientExist = await clientsRepo.findOne({
      id: client_id,
      user_id: userExists.user_id
    });
    if (!clientExist) throw new _AppError.default('Esse cliente não existe', 404);
    const hdaExist = await hdaRepo.findOne({
      id,
      client_id: clientExist.id
    });
    if (!hdaExist) throw new _AppError.default('Esse HDA não existe!', 404);
    let newHda = {
      id: hdaExist.id,
      about: hdaExist.hda,
      comments: hdaExist.comments,
      date: hdaExist.date,
      client_id: hdaExist.client_id,
      created_at: hdaExist.created_at,
      updated_at: hdaExist.updated_at
    };
    return newHda;
  }
}
var _default = GetHDAService;
exports.default = _default;