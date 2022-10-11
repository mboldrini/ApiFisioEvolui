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
class ListRespiratoryEvalService {
  async execute({
    client_id,
    user_code
  }) {
    const usersRepo = (0, _typeorm.getCustomRepository)(_UsersRepository.UsersRepository);
    const clientsRepo = (0, _typeorm.getCustomRepository)(_ClientsRepository.ClientsRepository);
    const pEvalRepo = (0, _typeorm.getCustomRepository)(_RespiratoryEval.ClientRespiratoryEvalRepository);
    const userExists = await usersRepo.findOne({
      user_code
    });
    if (!userExists) throw new _AppError.default('Esse usuário não existe', 404);
    const clientExist = await clientsRepo.findOne({
      id: client_id,
      user_id: userExists.user_id
    });
    if (!clientExist) throw new _AppError.default('Esse cliente não existe', 404);
    const clientEvalExist = await pEvalRepo.find({
      client_id: clientExist.id
    });
    if (!clientEvalExist) throw new _AppError.default('Essa avaliação respiratória não existe!', 404);
    const newClientEvalList = clientEvalExist.map(clientEval => ({
      id: clientEval.id,
      about: clientEval.evaluation,
      comments: clientEval.comments,
      date: clientEval.date,
      client_id: clientEval.client_id,
      created_at: clientEval.created_at,
      updated_at: clientEval.updated_at
    }));
    return newClientEvalList;
  }
}
var _default = ListRespiratoryEvalService;
exports.default = _default;