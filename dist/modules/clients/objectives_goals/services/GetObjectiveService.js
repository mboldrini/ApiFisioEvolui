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
class GetObjectiveService {
  async execute({
    id,
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
    const objectiveExist = await objectiveRepo.findOne({
      id,
      client_id: clientExist.id
    });
    if (!objectiveExist) throw new _AppError.default('Esse objetivo/meta não existe!', 404);
    const newObjectives = {
      id: objectiveExist.id,
      about: objectiveExist.objectives,
      comments: objectiveExist.comments,
      date: objectiveExist.date,
      client_id: objectiveExist.client_id,
      created_at: objectiveExist.created_at,
      updated_at: objectiveExist.updated_at
    };
    return newObjectives;
  }
}
var _default = GetObjectiveService;
exports.default = _default;