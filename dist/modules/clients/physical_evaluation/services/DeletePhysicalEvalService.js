"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _PhysicalEval = require("./../typeorm/repositories/PhysicalEval");
var _UsersRepository = require("./../../../users/users/typeorm/repositories/UsersRepository");
var _ClientsRepository = require("./../../clients/typeorm/repositories/ClientsRepository");
var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class DeletePhysicalEvalService {
  async execute({
    id,
    client_id,
    user_code
  }) {
    const usersRepo = (0, _typeorm.getCustomRepository)(_UsersRepository.UsersRepository);
    const clientsRepo = (0, _typeorm.getCustomRepository)(_ClientsRepository.ClientsRepository);
    const hppRepo = (0, _typeorm.getCustomRepository)(_PhysicalEval.ClientPhysicalEvalRepository);
    const userExists = await usersRepo.findOne({
      user_code
    });
    if (!userExists) throw new _AppError.default('Esse usuário não existe', 404);
    const clientExist = await clientsRepo.findOne({
      id: client_id,
      user_id: userExists.user_id
    });
    if (!clientExist) throw new _AppError.default('Esse cliente não existe', 404);
    const evalExist = await hppRepo.findOne({
      id,
      client_id: clientExist.id
    });
    if (!evalExist) throw new _AppError.default('Essa avaliação física não existe!', 404);
    hppRepo.delete(evalExist);
    return {
      message: 'ok'
    };
  }
}
var _default = DeletePhysicalEvalService;
exports.default = _default;