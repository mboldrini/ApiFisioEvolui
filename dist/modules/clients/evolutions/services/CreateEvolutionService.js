"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _FunctionalDiagnosis = require("../typeorm/repositories/FunctionalDiagnosis");
var _UsersRepository = require("../../../users/users/typeorm/repositories/UsersRepository");
var _ClientsRepository = require("../../clients/typeorm/repositories/ClientsRepository");
var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class CreateEvolutionService {
  async execute({
    about,
    comments,
    date,
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
    const evolutionExist = await clientsRepo.findOne({
      id: client_id,
      user_id: userExists.user_id
    });
    if (!evolutionExist) throw new _AppError.default('Essa evolução não existe', 404);
    const newEvolution = evolutionsRepo.create({
      about: about,
      comments,
      date,
      client_id: evolutionExist.id,
      user_id: userExists.user_id
    });
    await evolutionsRepo.save(newEvolution);
    return newEvolution;
  }
}
var _default = CreateEvolutionService;
exports.default = _default;