"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _FunctionalDiagnosis = require("./../typeorm/repositories/FunctionalDiagnosis");
var _UsersRepository = require("./../../../users/users/typeorm/repositories/UsersRepository");
var _ClientsRepository = require("./../../clients/typeorm/repositories/ClientsRepository");
var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class ListEvolutionsService {
  async execute({
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
    const evolutionExist = await evolutionsRepo.find({
      client_id: clientExist.id
    });
    if (!evolutionExist) throw new _AppError.default('Essa evolução não existe!', 404);
    const newEvolutionsList = evolutionExist.map(evolution => ({
      id: evolution.id,
      about: evolution.about,
      comments: evolution.comments,
      date: evolution.date,
      client_id: evolution.client_id,
      created_at: evolution.created_at,
      updated_at: evolution.updated_at
    }));
    return newEvolutionsList;
  }
}
var _default = ListEvolutionsService;
exports.default = _default;