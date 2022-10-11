"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ClientObjectives = require("./../typeorm/repositories/ClientObjectives");
var _UsersRepository = require("./../../../users/users/typeorm/repositories/UsersRepository");
var _ClientsRepository = require("./../../clients/typeorm/repositories/ClientsRepository");
var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class ListObjectiveService {
  async execute({
    client_id,
    user_code
  }) {
    const usersRepo = (0, _typeorm.getCustomRepository)(_UsersRepository.UsersRepository);
    const clientsRepo = (0, _typeorm.getCustomRepository)(_ClientsRepository.ClientsRepository);
    const objectiveRepo = (0, _typeorm.getCustomRepository)(_ClientObjectives.ClientObjectivesRepository);
    const userExists = await usersRepo.findOne({
      user_code
    });
    if (!userExists) throw new _AppError.default('Esse usuário não existe', 404);
    const clientExist = await clientsRepo.findOne({
      id: client_id,
      user_id: userExists.user_id
    });
    if (!clientExist) throw new _AppError.default('Esse cliente não existe', 404);
    const clientObjectiveExist = await objectiveRepo.find({
      client_id: clientExist.id
    });
    if (!clientObjectiveExist) throw new _AppError.default('Esse Objetivo/Meta não existe!', 404);
    const newObjectivesList = clientObjectiveExist.map(objectives => ({
      id: objectives.id,
      about: objectives.objectives,
      comments: objectives.comments,
      date: objectives.date,
      client_id: objectives.client_id,
      created_at: objectives.created_at,
      updated_at: objectives.updated_at
    }));
    return newObjectivesList;
  }
}
var _default = ListObjectiveService;
exports.default = _default;