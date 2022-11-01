"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Diagnostic = require("./../typeorm/repositories/Diagnostic");
var _UsersRepository = require("./../../../users/users/typeorm/repositories/UsersRepository");
var _ClientsRepository = require("./../../clients/typeorm/repositories/ClientsRepository");
var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class GetDiagnosticService {
  async execute({
    id,
    client_id,
    user_code
  }) {
    const usersRepo = (0, _typeorm.getCustomRepository)(_UsersRepository.UsersRepository);
    const clientsRepo = (0, _typeorm.getCustomRepository)(_ClientsRepository.ClientsRepository);
    const diagnosticRepo = (0, _typeorm.getCustomRepository)(_Diagnostic.DiagnosticRepository);
    const userExists = await usersRepo.findOne({
      user_code
    });
    if (!userExists) throw new _AppError.default('Esse usuário não existe', 404);
    const clientExist = await clientsRepo.findOne({
      id: client_id,
      user_id: userExists.user_id
    });
    if (!clientExist) throw new _AppError.default('Esse cliente não existe', 404);
    const diagnosticExist = await diagnosticRepo.findOne({
      id,
      client_id: clientExist.id
    });
    if (!diagnosticExist) throw new _AppError.default('Esse diagnostico não existe!', 404);
    let newDiagnostic = {
      id: diagnosticExist.id,
      about: diagnosticExist.diagnostic,
      comments: diagnosticExist.comments,
      date: diagnosticExist.date,
      client_id: diagnosticExist.client_id,
      created_at: diagnosticExist.created_at,
      updated_at: diagnosticExist.updated_at
    };
    return newDiagnostic;
  }
}
var _default = GetDiagnosticService;
exports.default = _default;