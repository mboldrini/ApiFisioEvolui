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
class GetPhysicalEvalService {
  async execute({
    id,
    client_id,
    user_code
  }) {
    const usersRepo = (0, _typeorm.getCustomRepository)(_UsersRepository.UsersRepository);
    const clientsRepo = (0, _typeorm.getCustomRepository)(_ClientsRepository.ClientsRepository);
    const pEvalRepo = (0, _typeorm.getCustomRepository)(_PhysicalEval.ClientPhysicalEvalRepository);
    const userExists = await usersRepo.findOne({
      user_code
    });
    if (!userExists) throw new _AppError.default('Esse usuário não existe', 404);
    const clientExist = await clientsRepo.findOne({
      id: client_id,
      user_id: userExists.user_id
    });
    if (!clientExist) throw new _AppError.default('Esse cliente não existe', 404);
    const evalExist = await pEvalRepo.findOne({
      id,
      client_id: clientExist.id
    });
    if (!evalExist) throw new _AppError.default('Essa avaliação física não existe!', 404);
    const newEval = {
      id: evalExist.id,
      about: evalExist.evaluation,
      comments: evalExist.comments,
      date: evalExist.date,
      client_id: evalExist.client_id,
      created_at: evalExist.created_at,
      updated_at: evalExist.updated_at
    };
    return newEval;
  }
}
var _default = GetPhysicalEvalService;
exports.default = _default;