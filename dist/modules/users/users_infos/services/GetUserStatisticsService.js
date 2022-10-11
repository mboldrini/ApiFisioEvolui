"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _AppointmentsRepository = require("./../../../appointments/typeorm/repositories/AppointmentsRepository");
var _ClientsRepository = require("./../../../clients/clients/typeorm/repositories/ClientsRepository");
var _UsersRepository = require("../../users/typeorm/repositories/UsersRepository");
var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class GetUsersStatisticsService {
  async execute({
    user_code
  }) {
    const usersRepo = (0, _typeorm.getCustomRepository)(_UsersRepository.UsersRepository);
    const userPacientsRepo = (0, _typeorm.getCustomRepository)(_ClientsRepository.ClientsRepository);
    const userAtendimentosRepo = (0, _typeorm.getCustomRepository)(_AppointmentsRepository.AppointmentsRepository);
    const userEvolcuoesRepo = (0, _typeorm.getCustomRepository)(_AppointmentsRepository.AppointmentsRepository);
    const userExists = await usersRepo.findOne({
      user_code
    });
    if (!userExists) throw new _AppError.default('Usuário não existe', 404);
    const usersPacientes = await userPacientsRepo.findAndCount({
      user_id: userExists.user_id,
      enabled: true
    });
    const userAtendimentos = await userAtendimentosRepo.findAndCount({
      user_id: userExists.user_id
    });
    const userEvolucoes = await userEvolcuoesRepo.findAndCount({
      user_id: userExists.user_id,
      status: 1,
      scheduled: true
    });
    const retorno = {
      qtdPacientes: Object.keys(usersPacientes[0]).length,
      qtdAtendimentos: Object.keys(userAtendimentos[0]).length,
      qtdEvolucoes: Object.keys(userEvolucoes[0]).length
    };
    return retorno;
  }
}
var _default = GetUsersStatisticsService;
exports.default = _default;