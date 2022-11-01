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
class UpdateObjectiveService {
  async execute({
    id,
    objectives,
    comments,
    date,
    client_id,
    user_code
  }) {
    const usersRepo = (0, _typeorm.getCustomRepository)(_UsersRepository.UsersRepository);
    const clientsRepo = (0, _typeorm.getCustomRepository)(_ClientsRepository.ClientsRepository);
    const objectivesRepo = (0, _typeorm.getCustomRepository)(_ClientObjectives.ClientObjectivesRepository);
    const userExists = await usersRepo.findOne({
      user_code
    });
    if (!userExists) throw new _AppError.default("User don't exist", 404);
    const clientExist = await clientsRepo.findOne({
      id: client_id,
      user_id: userExists.user_id
    });
    if (!clientExist) throw new _AppError.default("This client don't exist", 404);
    const objectiveExist = await objectivesRepo.findOne({
      id,
      client_id: clientExist.id
    });
    if (!objectiveExist) throw new _AppError.default('Esse Objetivo/Meta não existe!', 404);
    objectiveExist.objectives = objectives;
    if (comments) {
      objectiveExist.comments = comments;
    }
    objectiveExist.date = date;
    await objectivesRepo.save(objectiveExist);
    return objectiveExist;
  }
}
var _default = UpdateObjectiveService;
exports.default = _default;