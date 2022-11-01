"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _RespiratoryEval = require("./../typeorm/repositories/RespiratoryEval");
var _UsersRepository = require("./../../../users/users/typeorm/repositories/UsersRepository");
var _ClientsRepository = require("./../../clients/typeorm/repositories/ClientsRepository");
var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class UpdateRespiratoryEvalService {
  async execute({
    id,
    evaluation,
    comments,
    date,
    client_id,
    user_code
  }) {
    const usersRepo = (0, _typeorm.getCustomRepository)(_UsersRepository.UsersRepository);
    const clientsRepo = (0, _typeorm.getCustomRepository)(_ClientsRepository.ClientsRepository);
    const respRepo = (0, _typeorm.getCustomRepository)(_RespiratoryEval.ClientRespiratoryEvalRepository);
    const userExists = await usersRepo.findOne({
      user_code
    });
    if (!userExists) throw new _AppError.default("User don't exist", 404);
    const clientExist = await clientsRepo.findOne({
      id: client_id,
      user_id: userExists.user_id
    });
    if (!clientExist) throw new _AppError.default("This client don't exist", 404);
    const respExist = await respRepo.findOne({
      id,
      client_id: clientExist.id
    });
    if (!respExist) throw new _AppError.default('Essa  não existe!', 404);
    respExist.evaluation = evaluation;
    if (comments) {
      respExist.comments = comments;
    }
    respExist.date = date;
    await respRepo.save(respExist);
    return respExist;
  }
}
var _default = UpdateRespiratoryEvalService;
exports.default = _default;