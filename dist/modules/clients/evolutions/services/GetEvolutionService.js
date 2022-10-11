"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _FunctionalDiagnosis = require("./../typeorm/repositories/FunctionalDiagnosis");
var _UsersRepository = require("../../../users/users/typeorm/repositories/UsersRepository");
var _ClientsRepository = require("../../clients/typeorm/repositories/ClientsRepository");
var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class GetEvolutionService {
  async execute({
    id,
    client_id,
    user_code
  }) {
    const usersRepo = (0, _typeorm.getCustomRepository)(_UsersRepository.UsersRepository);
    const clientsRepo = (0, _typeorm.getCustomRepository)(_ClientsRepository.ClientsRepository);
    const evolutionsRepo = (0, _typeorm.getCustomRepository)(_FunctionalDiagnosis.ClientEvolutionsRepository);
    const userExists = await usersRepo.findOne({
      user_code
    });
    if (!userExists) throw new _AppError.default('Esse usuário não existe', 404);
    const clientExist = await clientsRepo.findOne({
      id: client_id,
      user_id: userExists.user_id
    });
    if (!clientExist) throw new _AppError.default('Esse cliente não existe', 404);
    const evolutionExist = await evolutionsRepo.findOne({
      id,
      client_id: clientExist.id
    });
    if (!evolutionExist) throw new _AppError.default('Essa evolução não existe!', 404);
    const newEvolution = {
      id: evolutionExist.id,
      about: evolutionExist.about,
      comments: evolutionExist.comments,
      date: evolutionExist.date,
      client_id: evolutionExist.client_id,
      created_at: evolutionExist.created_at,
      updated_at: evolutionExist.updated_at
    };
    return newEvolution;
  }
}
var _default = GetEvolutionService;
exports.default = _default;