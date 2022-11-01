"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ClientHPP = require("./../typeorm/repositories/ClientHPP");
var _UsersRepository = require("./../../../users/users/typeorm/repositories/UsersRepository");
var _ClientsRepository = require("./../../clients/typeorm/repositories/ClientsRepository");
var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class GetHPPService {
  async execute({
    id,
    client_id,
    user_code
  }) {
    const usersRepo = (0, _typeorm.getCustomRepository)(_UsersRepository.UsersRepository);
    const clientsRepo = (0, _typeorm.getCustomRepository)(_ClientsRepository.ClientsRepository);
    const hppRepo = (0, _typeorm.getCustomRepository)(_ClientHPP.ClientHPPRepository);
    const userExists = await usersRepo.findOne({
      user_code
    });
    if (!userExists) throw new _AppError.default('Esse usuário não existe', 404);
    const clientExist = await clientsRepo.findOne({
      id: client_id,
      user_id: userExists.user_id
    });
    if (!clientExist) throw new _AppError.default('Esse cliente não existe', 404);
    const hppExist = await hppRepo.findOne({
      id,
      client_id: clientExist.id
    });
    if (!hppExist) throw new _AppError.default('Esse HPP não existe!', 404);
    const newHpp = {
      id: hppExist.id,
      about: hppExist.hpp,
      comments: hppExist.comments,
      date: hppExist.date,
      client_id: hppExist.client_id,
      created_at: hppExist.created_at,
      updated_at: hppExist.updated_at
    };
    return newHpp;
  }
}
var _default = GetHPPService;
exports.default = _default;